import { writeFileSync } from "node:fs";

const image = (file) =>
  `https://cdn.jsdelivr.net/gh/apyrtech/maison-safa@main/public/products/${file}`;

const thobe = ["52", "54", "56", "58", "60", "62"];
const abaya = ["50", "52", "54", "56", "58", "60"];
const koofi = ["54", "56", "58", "60"];

const products = [
  ["qasr", "The Qasr", "thobes", 340, "Ivory long-staple cotton", "Ivory", thobe, 450, true, "A straight thobe in ivory cotton, with a concealed placket and no pocket.", "Cut full enough to walk, narrow enough that the sleeve stays quiet. This is the pattern the house is known by. The hem is meant to break once, at the ankle.", "100% Egyptian long-staple cotton, 145 gsm. Woven for a matte hand.", "Cool wash, inside out. Hang dry. Warm iron on the reverse. No tumble dryer.", "Gulf numbering, true to size. 56 is the size we cut most. Leave your height in the bag note if you want the hem changed.", "qasr.jpg", "The Qasr, an ivory thobe."],
  ["najd", "The Najd", "thobes", 310, "Sand linen-cotton", "Sand", thobe, 450, false, "Sand linen with an open collar and a single shell button.", "A dry cloth for heat. The collar sits open, the sleeve is a touch shorter, and the weave shows. It softens every time it is washed.", "70% linen, 30% cotton, 160 gsm.", "Cool wash. Hang dry, and reshape the collar while it is still damp. Iron slightly damp.", "Same numbering as the Qasr, with a little more ease through the chest.", "najd.jpg", "The Najd, a sand thobe."],
  ["marjan", "The Marjan", "thobes", 420, "Charcoal wool", "Charcoal", thobe, 520, true, "An evening thobe in charcoal wool, with a covered placket and turned cuffs.", "Heavier than our cottons, and meant to be. The wool holds a line from shoulder to hem. This is not a summer cloth.", "90% wool, 10% silk, 240 gsm.", "Dry clean, or a cold wool wash if you are careful. Steam rather than press. Rest it on a hanger.", "Cut close to the Qasr, with a narrower cuff. If you wear a watch, stay with your usual size.", "marjan.jpg", "The Marjan, a charcoal wool thobe."],
  ["wadi", "The Wadi", "thobes", 280, "Olive poplin", "Olive", thobe, 420, false, "Everyday olive poplin, with a short placket and one chest pocket.", "The piece we expect to be worn hard. Double-needle seams, a pocket that sits flat, a color that reads as olive in sun and stone in shade.", "100% cotton poplin, 130 gsm.", "Machine wash cool. Hang dry. Iron the pocket from the reverse so it stays flat.", "Our easiest thobe. Stay with your usual number.", "wadi.jpg", "The Wadi, an olive thobe."],
  ["safa", "The Safa", "abayas", 460, "Black wool crepe", "Black", abaya, 500, true, "Open-front black crepe. Wide sleeves, brought in at the wrist. No belt.", "The first abaya we cut, and the one the others are measured against. The front falls straight. The sleeve is wide enough to move, then quiet at the hand.", "Wool crepe, 180 gsm. Unlined.", "Cool gentle wash in a bag, or dry clean. Hang at once. Steam the front edges.", "Abaya numbering, 50 to 60. Because it is open, choose by shoulder and length. 54 is the size we cut most.", "safa.jpg", "The Safa, a black open abaya."],
  ["noor", "The Noor", "abayas", 390, "Taupe crepe", "Taupe", abaya, 480, true, "A column in warm taupe, with a high neck and a narrow opening.", "Stone in daylight, honey indoors. Unlined, so it packs. The opening is only as wide as it needs to be.", "Silk-touch crepe, 160 gsm. Unlined.", "Cool wash in a bag. Hang dry. Steam to release the front.", "Close through the shoulder, straight through the body. If you layer under it, stay with your usual size.", "noor.jpg", "The Noor, a taupe abaya."],
  ["layl", "The Layl", "abayas", 440, "Midnight navy crepe", "Navy", abaya, 500, false, "A closed navy abaya with a row of covered buttons and a quiet sheen.", "For evenings that run long. The buttons are covered in the same cloth. The hem has allowance if you want it let down.", "Satin-back crepe, 190 gsm.", "Dry clean. Hang on a wide bar so the buttons do not pull the front.", "Closed front — take the size you wear in a dress, not a coat. 54 closes cleanly on most.", "layl.jpg", "The Layl, a navy abaya."],
  ["hilal", "The Hilal", "abayas", 480, "Ivory cotton-silk", "Ivory", abaya, 480, false, "An ivory abaya with one line of tone-on-tone stitch at the cuff.", "The stitch is geometric, and you see it when the sleeve moves. No floral, no contrast thread. Open front, the same shoulder as the Safa.", "Cotton-silk, 170 gsm. The cuff stitch is the same yarn.", "Cool wash inside out, or dry clean to keep the cuff crisp. Iron on the reverse.", "Open front. Length is the decision — leave your height if you want the hem adjusted.", "hilal.jpg", "The Hilal, an ivory abaya."],
  ["madina", "The Madina", "koofis", 68, "Cream wool", "Cream", koofi, 70, true, "A hand-crocheted cream koofi with an open stitch and a rolled edge.", "Close to the head, and breathable in a way a machine knit is not. Made in small batches. Koofi is our spelling of the kufi cap.", "100% wool, hand crochet.", "Cold hand wash. Reshape over a bowl and dry flat. Do not tumble.", "Circumference in centimeters. 56 fits most. Between sizes, take the larger.", "madina.jpg", "The Madina, a cream crocheted koofi."],
  ["makkah", "The Makkah", "koofis", 62, "Charcoal cotton knit", "Charcoal", koofi, 70, false, "A low charcoal knit that sits under a scarf without bulk.", "A fine rib that recovers its shape. The profile is lower than the Madina, for days when you want the cap to disappear.", "100% cotton knit.", "Cool wash. Dry flat. Do not stretch the rib while it is wet.", "54 to 60 cm. The rib flexes, so 56 is the safe choice.", "makkah.jpg", "The Makkah, a charcoal koofi."],
  ["atlas", "The Atlas", "koofis", 78, "Sand linen", "Sand", koofi, 80, true, "A lightly structured sand linen koofi with a bound edge.", "It holds a shape the crochet does not. Named for a wool route, cut from linen, because linen keeps its line in heat.", "100% linen, with a bound edge in the same cloth.", "Steam to refresh. Spot clean. If you wash it, do so cold and reshape it at once.", "Less give than the knits. Measure, and do not size down.", "atlas.jpg", "The Atlas, a sand linen koofi."],
  ["sahra", "The Sahra", "koofis", 85, "Olive wool", "Olive", koofi, 80, false, "Deep olive wool with a narrow embroidered rim in the same yarn.", "The rim is visible only up close. Firmer than the Madina, and quieter than anything stitched in a contrast thread.", "Wool felt body. Embroidered rim in matching wool.", "Brush with a clothes brush. Steam, do not soak. Keep it out of hard sun between wears.", "Structured, so the centimeter is honest. 58 is the full fit.", "sahra.jpg", "The Sahra, an olive wool koofi."],
];

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;");
}

function body(summary, story, composition, care, fit) {
  return [
    `<p>${htmlEscape(summary)}</p>`,
    `<p>${htmlEscape(story)}</p>`,
    `<h3>Cloth</h3><p>${htmlEscape(composition)}</p>`,
    `<h3>Care</h3><p>${htmlEscape(care)}</p>`,
    `<h3>Fit</h3><p>${htmlEscape(fit)}</p>`,
  ].join("");
}

const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Status",
];

const rows = [header];

for (const item of products) {
  const [
    handle,
    title,
    category,
    price,
    fabric,
    color,
    sizes,
    grams,
    featured,
    summary,
    story,
    composition,
    care,
    fit,
    file,
    alt,
  ] = item;
  const tags = featured ? `${category}, featured` : category;
  const html = body(summary, story, composition, care, fit);
  sizes.forEach((size, index) => {
    const first = index === 0;
    rows.push([
      handle,
      first ? title : "",
      first ? html : "",
      first ? "Maison Safa" : "",
      first ? fabric : "",
      first ? tags : "",
      first ? "TRUE" : "",
      "Size",
      size,
      `${handle}-${size}`.toUpperCase(),
      grams,
      "continue",
      "manual",
      price,
      "TRUE",
      "TRUE",
      first ? image(file) : "",
      first ? "1" : "",
      first ? alt : "",
      first ? "FALSE" : "",
      first ? `${title} — Maison Safa` : "",
      first ? summary : "",
      first ? "active" : "",
    ]);
  });
}

const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n";
writeFileSync(new URL("./products.csv", import.meta.url), csv);
console.log(`wrote ${rows.length - 1} variant rows`);
