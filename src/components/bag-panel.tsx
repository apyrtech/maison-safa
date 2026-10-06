import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Panel } from "@/components/panel";
import { buttonClass } from "@/components/ui/button";
import {
  FREE_SHIPPING_FROM,
  getProduct,
  shippingFor,
} from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

type Receipt = { id: string; email: string; total: number };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BagPanel() {
  const open = useCart((state) => state.bagOpen);
  const setBagOpen = useCart((state) => state.setBagOpen);
  const lines = useCart((state) => state.lines);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const [stage, setStage] = useState<"bag" | "details" | "done">("bag");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const formId = useId();

  useEffect(() => {
    if (lines.length > 0 && stage === "done") setStage("bag");
  }, [lines.length, stage]);

  const detailed = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.slug);
        return product ? [{ line, product }] : [];
      }),
    [lines],
  );

  const subtotal = detailed.reduce((sum, item) => sum + item.product.price * item.line.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Leave a name the atelier can use.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("The email does not look complete.");
      return;
    }
    if (city.trim().length < 2) {
      setError("Tell us a city for delivery.");
      return;
    }
    const id = `SF-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({ id, email: email.trim(), total });
    setError("");
    setStage("done");
    clear();
  }

  return (
    <Panel open={open} label="Bag" side="right">
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <h2 className="font-serif text-3xl">Bag</h2>
        <button
          type="button"
          className="tap grid size-11 place-items-center"
          aria-label="Close bag"
          onClick={() => setBagOpen(false)}
        >
          <X className="size-5" strokeWidth={1.4} />
        </button>
      </div>

      {stage === "done" && receipt ? (
        <div className="flex flex-1 flex-col px-5 py-8">
          <p className="text-xs tracking-label text-muted uppercase">Reserved</p>
          <p className="mt-3 font-serif text-5xl">{receipt.id}</p>
          <p className="mt-4 text-sm text-muted">
            We will write to {receipt.email} within a day to confirm cloth, size, and payment.
            Nothing is charged on this page. The note was for {formatPrice(receipt.total)}.
          </p>
          <button
            type="button"
            className={buttonClass("ink", "mt-8")}
            onClick={() => {
              setReceipt(null);
              setStage("bag");
              setBagOpen(false);
            }}
          >
            Continue
          </button>
        </div>
      ) : detailed.length === 0 ? (
        <div className="flex flex-1 flex-col justify-center px-5">
          <p className="font-serif text-4xl">The bag is empty.</p>
          <p className="mt-3 text-sm text-muted">Twelve pieces this season, cut when you ask.</p>
          <Link to="/shop" search={{}} className={buttonClass("ink", "mt-8 self-start")}>
            Shop the house
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-5">
            <ul>
              {detailed.map(({ line, product }) => (
                <li key={`${line.slug}-${line.size}`} className="flex gap-4 border-b border-line py-5">
                  <img
                    src={product.image}
                    alt=""
                    width={1200}
                    height={1600}
                    className="aspect-portrait w-16 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        className="font-serif text-2xl"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm tabular-nums">
                        {formatPrice(product.price * line.qty)}
                      </p>
                    </div>
                    <p className="text-sm text-muted">
                      Size {line.size}
                      {product.category === "koofis" ? " cm" : ""}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          className="tap grid size-11 place-items-center"
                          aria-label={`Decrease ${product.name}`}
                          onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        >
                          <Minus className="size-4" strokeWidth={1.4} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          className="tap grid size-11 place-items-center"
                          aria-label={`Increase ${product.name}`}
                          disabled={line.qty >= 8}
                          onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        >
                          <Plus className="size-4" strokeWidth={1.4} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="min-h-11 text-xs tracking-label text-muted uppercase"
                        onClick={() => remove(line.slug, line.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {stage === "details" ? (
              <form id={formId} onSubmit={submit} noValidate className="space-y-4 py-6">
                <div>
                  <label htmlFor={`${formId}-name`} className="text-xs tracking-label text-muted uppercase">
                    Name
                  </label>
                  <input
                    id={`${formId}-name`}
                    className="field"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-email`} className="text-xs tracking-label text-muted uppercase">
                    Email
                  </label>
                  <input
                    id={`${formId}-email`}
                    className="field"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-city`} className="text-xs tracking-label text-muted uppercase">
                    City
                  </label>
                  <input
                    id={`${formId}-city`}
                    className="field"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-note`} className="text-xs tracking-label text-muted uppercase">
                    Note
                  </label>
                  <textarea
                    id={`${formId}-note`}
                    className="field min-h-24 resize-y"
                    maxLength={280}
                    placeholder="Height, sleeve, or a cloth question"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                </div>
                {error ? (
                  <p className="text-sm text-ink" role="alert">
                    {error}
                  </p>
                ) : null}
              </form>
            ) : null}
          </div>

          <div className="safe-bottom border-t border-line px-5 pt-4">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between pt-1 text-base">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-muted">
              Complimentary shipping from {formatPrice(FREE_SHIPPING_FROM)}. Cut to order, two to
              three weeks.
            </p>
            {stage === "details" ? (
              <button type="submit" form={formId} className={buttonClass("ink", "mt-4 w-full")}>
                Send to the atelier
              </button>
            ) : (
              <button
                type="button"
                className={buttonClass("ink", "mt-4 w-full")}
                onClick={() => setStage("details")}
              >
                Reserve
              </button>
            )}
          </div>
        </>
      )}
    </Panel>
  );
}
