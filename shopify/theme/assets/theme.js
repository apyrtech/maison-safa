(function () {
  const moneyFormat = document.documentElement.dataset.money || "${{amount}}";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "\u0026amp;")
      .replace(/</g, "\u0026lt;")
      .replace(/>/g, "\u0026gt;")
      .replace(/"/g, "\u0026quot;");
  }

  function money(cents) {
    const dollars = (cents / 100).toFixed(2);
    const whole = String(Math.round(cents / 100));
    return moneyFormat
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, whole)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, whole)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, dollars.replace(".", ","))
      .replace(/\{\{\s*amount\s*\}\}/g, dollars);
  }

  function panels() {
    return Array.from(document.querySelectorAll("[data-panel]"));
  }

  function lock() {
    document.body.classList.toggle(
      "lock",
      panels().some((panel) => panel.dataset.open === "true"),
    );
  }

  function closeAll(except) {
    panels().forEach((panel) => {
      if (panel === except) return;
      panel.dataset.open = "false";
      panel.setAttribute("aria-hidden", "true");
    });
    document.querySelectorAll("[data-open-panel]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
    lock();
  }

  function open(name) {
    const panel = document.querySelector('[data-panel="' + name + '"]');
    if (!panel) return;
    closeAll(panel);
    panel.dataset.open = "true";
    panel.setAttribute("aria-hidden", "false");
    const trigger = document.querySelector('[data-open-panel="' + name + '"]');
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    lock();
    const focusable = panel.querySelector("input, button, a");
    if (focusable) focusable.focus();
  }

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open-panel]");
    if (opener) {
      const name = opener.getAttribute("data-open-panel");
      const panel = document.querySelector('[data-panel="' + name + '"]');
      if (panel && panel.dataset.open === "true") closeAll();
      else open(name);
      return;
    }
    if (event.target.closest("[data-close-panel]")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });

  function renderCart(cart) {
    const count = document.querySelector("[data-cart-count]");
    if (count) {
      count.textContent = cart.item_count > 0 ? String(cart.item_count) : "";
    }
    const body = document.querySelector("[data-cart-body]");
    const foot = document.querySelector("[data-cart-foot]");
    if (!body) return;
    if (!cart.items.length) {
      body.innerHTML = '<p class="empty">The bag is empty.</p>';
      if (foot) foot.hidden = true;
      return;
    }
    body.innerHTML = cart.items
      .map((item) => {
        const image = item.image
          ? '<img src="' + esc(item.image) + '" alt="" width="160" height="200" class="cover">'
          : "";
        return (
          '<article class="line">' +
          '<div class="portrait">' +
          image +
          "</div>" +
          "<div>" +
          "<h3>" +
          esc(item.product_title) +
          "</h3>" +
          '<p class="card-meta">' +
          esc(item.variant_title || "") +
          "</p>" +
          '<div class="qty">' +
          '<button type="button" data-qty="' +
          esc(item.key) +
          '" data-delta="-1" aria-label="Decrease">−</button>' +
          "<span>" +
          item.quantity +
          "</span>" +
          '<button type="button" data-qty="' +
          esc(item.key) +
          '" data-delta="1" aria-label="Increase">+</button>' +
          "</div>" +
          '<p class="card-meta">' +
          money(item.final_line_price) +
          "</p>" +
          "</div></article>"
        );
      })
      .join("");
    const total = document.querySelector("[data-cart-total]");
    if (total) total.textContent = money(cart.total_price);
    const note = document.querySelector("[data-ship-note]");
    const threshold = Number(document.documentElement.dataset.freeShipping || 0) * 100;
    if (note) {
      note.textContent =
        threshold && cart.total_price >= threshold
          ? "Shipping is complimentary."
          : "Cut to order. Allow two to three weeks.";
    }
    if (foot) foot.hidden = false;
  }

  async function getCart() {
    const cart = await fetch("/cart.js", { headers: { Accept: "application/json" } }).then((r) =>
      r.json(),
    );
    renderCart(cart);
    return cart;
  }

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-qty]");
    if (!button) return;
    const key = button.getAttribute("data-qty");
    const delta = Number(button.getAttribute("data-delta"));
    const current = Number(button.parentElement.querySelector("span").textContent);
    const quantity = Math.max(0, current + delta);
    const cart = await fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ id: key, quantity }),
    }).then((r) => r.json());
    renderCart(cart);
  });

  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("form.product-form");
    if (!form) return;
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    const data = new FormData(form);
    if (!data.get("id")) {
      if (note) note.textContent = "Choose a size.";
      return;
    }
    const button = form.querySelector("[type='submit']");
    if (button) button.disabled = true;
    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: Number(data.get("id")), quantity: 1 }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (note) note.textContent = err.description || "That size could not be added.";
        return;
      }
      if (note) note.textContent = "";
      await getCart();
      open("cart");
    } finally {
      if (button) button.disabled = false;
    }
  });

  const preview = document.querySelector("[data-edit-preview]");
  document.querySelectorAll("[data-edit-link]").forEach((link) => {
    const show = () => {
      document.querySelectorAll("[data-edit-link]").forEach((other) => {
        other.setAttribute("aria-current", other === link ? "true" : "false");
      });
      if (!preview) return;
      const img = preview.querySelector("img");
      if (img && link.dataset.image) {
        img.src = link.dataset.image;
        img.alt = link.dataset.alt || "";
      }
      const name = preview.querySelector("[data-edit-name]");
      const price = preview.querySelector("[data-edit-price]");
      const fabric = preview.querySelector("[data-edit-fabric]");
      if (name) name.textContent = link.dataset.name || "";
      if (price) price.textContent = link.dataset.price || "";
      if (fabric) fabric.textContent = link.dataset.fabric || "";
    };
    link.addEventListener("mouseenter", show);
    link.addEventListener("focus", show);
  });

  getCart().catch(function () {});
})();
