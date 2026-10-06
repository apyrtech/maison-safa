export type CategoryId = "thobes" | "abayas" | "koofis";

export type Swatch =
  | "ivory"
  | "sand"
  | "charcoal"
  | "olive"
  | "black"
  | "taupe"
  | "navy";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  fabric: string;
  weight: string;
  colorName: string;
  swatch: Swatch;
  summary: string;
  story: string;
  composition: string;
  care: string;
  fit: string;
  sizes: string[];
  image: string;
  featured: boolean;
};

export const FREE_SHIPPING_FROM = 280;
export const SHIPPING_FEE = 24;

const THOBE_SIZES = ["52", "54", "56", "58", "60", "62"];
const ABAYA_SIZES = ["50", "52", "54", "56", "58", "60"];
const KOOFI_SIZES = ["54", "56", "58", "60"];

export const swatchClass: Record<Swatch, string> = {
  ivory: "bg-swatch-ivory",
  sand: "bg-swatch-sand",
  charcoal: "bg-swatch-charcoal",
  olive: "bg-swatch-olive",
  black: "bg-swatch-black",
  taupe: "bg-swatch-taupe",
  navy: "bg-swatch-navy",
};

export const categories: {
  id: CategoryId;
  label: string;
  singular: string;
  index: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "thobes",
    label: "Thobes",
    singular: "thobe",
    index: "01",
    title: "For the long day",
    copy: "Ankle-length and straight through the body. Cotton and linen for heat, wool when the evening asks for it.",
    image: "/products/qasr.jpg",
    imageAlt: "The Qasr, an ivory thobe, hanging on a walnut hanger.",
  },
  {
    id: "abayas",
    label: "Abayas",
    singular: "abaya",
    index: "02",
    title: "An honest fall",
    copy: "Outer layers with a clean shoulder and a sleeve that stays out of the way. Open, or closed with covered buttons.",
    image: "/products/safa.jpg",
    imageAlt: "The Safa, a black open abaya, hanging in the atelier.",
  },
  {
    id: "koofis",
    label: "Koofis",
    singular: "koofi",
    index: "03",
    title: "Close to the head",
    copy: "The koofi — our name for the kufi cap. Crochet, knit, linen, and wool. Nothing with a brim.",
    image: "/products/madina.jpg",
    imageAlt: "The Madina, a cream crocheted koofi, resting on limestone.",
  },
];

export const products: Product[] = [
  {
    slug: "qasr",
    name: "The Qasr",
    category: "thobes",
    price: 340,
    fabric: "Ivory long-staple cotton",
    weight: "145 gsm",
    colorName: "Ivory",
    swatch: "ivory",
    summary: "A straight thobe in ivory cotton, with a concealed placket and no pocket.",
    story:
      "Cut full enough to walk, narrow enough that the sleeve stays quiet. This is the pattern the house is known by. The hem is meant to break once, at the ankle.",
    composition: "100% Egyptian long-staple cotton, 145 gsm. Woven for a matte hand.",
    care: "Cool wash, inside out. Hang dry. Warm iron on the reverse. No tumble dryer.",
    fit: "Gulf numbering, true to size. 56 is the size we cut most. Leave your height in the bag note if you want the hem changed.",
    sizes: THOBE_SIZES,
    image: "/products/qasr.jpg",
    featured: true,
  },
  {
    slug: "najd",
    name: "The Najd",
    category: "thobes",
    price: 310,
    fabric: "Sand linen-cotton",
    weight: "160 gsm",
    colorName: "Sand",
    swatch: "sand",
    summary: "Sand linen with an open collar and a single shell button.",
    story:
      "A dry cloth for heat. The collar sits open, the sleeve is a touch shorter, and the weave shows. It softens every time it is washed.",
    composition: "70% linen, 30% cotton, 160 gsm.",
    care: "Cool wash. Hang dry, and reshape the collar while it is still damp. Iron slightly damp.",
    fit: "Same numbering as the Qasr, with a little more ease through the chest.",
    sizes: THOBE_SIZES,
    image: "/products/najd.jpg",
    featured: false,
  },
  {
    slug: "marjan",
    name: "The Marjan",
    category: "thobes",
    price: 420,
    fabric: "Charcoal wool",
    weight: "240 gsm",
    colorName: "Charcoal",
    swatch: "charcoal",
    summary: "An evening thobe in charcoal wool, with a covered placket and turned cuffs.",
    story:
      "Heavier than our cottons, and meant to be. The wool holds a line from shoulder to hem. This is not a summer cloth.",
    composition: "90% wool, 10% silk, 240 gsm.",
    care: "Dry clean, or a cold wool wash if you are careful. Steam rather than press. Rest it on a hanger.",
    fit: "Cut close to the Qasr, with a narrower cuff. If you wear a watch, stay with your usual size.",
    sizes: THOBE_SIZES,
    image: "/products/marjan.jpg",
    featured: true,
  },
  {
    slug: "wadi",
    name: "The Wadi",
    category: "thobes",
    price: 280,
    fabric: "Olive poplin",
    weight: "130 gsm",
    colorName: "Olive",
    swatch: "olive",
    summary: "Everyday olive poplin, with a short placket and one chest pocket.",
    story:
      "The piece we expect to be worn hard. Double-needle seams, a pocket that sits flat, a color that reads as olive in sun and stone in shade.",
    composition: "100% cotton poplin, 130 gsm.",
    care: "Machine wash cool. Hang dry. Iron the pocket from the reverse so it stays flat.",
    fit: "Our easiest thobe. Stay with your usual number.",
    sizes: THOBE_SIZES,
    image: "/products/wadi.jpg",
    featured: false,
  },
  {
    slug: "safa",
    name: "The Safa",
    category: "abayas",
    price: 460,
    fabric: "Black wool crepe",
    weight: "180 gsm",
    colorName: "Black",
    swatch: "black",
    summary: "Open-front black crepe. Wide sleeves, brought in at the wrist. No belt.",
    story:
      "The first abaya we cut, and the one the others are measured against. The front falls straight. The sleeve is wide enough to move, then quiet at the hand.",
    composition: "Wool crepe, 180 gsm. Unlined.",
    care: "Cool gentle wash in a bag, or dry clean. Hang at once. Steam the front edges.",
    fit: "Abaya numbering, 50 to 60. Because it is open, choose by shoulder and length. 54 is the size we cut most.",
    sizes: ABAYA_SIZES,
    image: "/products/safa.jpg",
    featured: true,
  },
  {
    slug: "noor",
    name: "The Noor",
    category: "abayas",
    price: 390,
    fabric: "Taupe crepe",
    weight: "160 gsm",
    colorName: "Taupe",
    swatch: "taupe",
    summary: "A column in warm taupe, with a high neck and a narrow opening.",
    story:
      "Stone in daylight, honey indoors. Unlined, so it packs. The opening is only as wide as it needs to be.",
    composition: "Silk-touch crepe, 160 gsm. Unlined.",
    care: "Cool wash in a bag. Hang dry. Steam to release the front.",
    fit: "Close through the shoulder, straight through the body. If you layer under it, stay with your usual size.",
    sizes: ABAYA_SIZES,
    image: "/products/noor.jpg",
    featured: true,
  },
  {
    slug: "layl",
    name: "The Layl",
    category: "abayas",
    price: 440,
    fabric: "Midnight navy crepe",
    weight: "190 gsm",
    colorName: "Navy",
    swatch: "navy",
    summary: "A closed navy abaya with a row of covered buttons and a quiet sheen.",
    story:
      "For evenings that run long. The buttons are covered in the same cloth. The hem has allowance if you want it let down.",
    composition: "Satin-back crepe, 190 gsm.",
    care: "Dry clean. Hang on a wide bar so the buttons do not pull the front.",
    fit: "Closed front — take the size you wear in a dress, not a coat. 54 closes cleanly on most.",
    sizes: ABAYA_SIZES,
    image: "/products/layl.jpg",
    featured: false,
  },
  {
    slug: "hilal",
    name: "The Hilal",
    category: "abayas",
    price: 480,
    fabric: "Ivory cotton-silk",
    weight: "170 gsm",
    colorName: "Ivory",
    swatch: "ivory",
    summary: "An ivory abaya with one line of tone-on-tone stitch at the cuff.",
    story:
      "The stitch is geometric, and you see it when the sleeve moves. No floral, no contrast thread. Open front, the same shoulder as the Safa.",
    composition: "Cotton-silk, 170 gsm. The cuff stitch is the same yarn.",
    care: "Cool wash inside out, or dry clean to keep the cuff crisp. Iron on the reverse.",
    fit: "Open front. Length is the decision — leave your height if you want the hem adjusted.",
    sizes: ABAYA_SIZES,
    image: "/products/hilal.jpg",
    featured: false,
  },
  {
    slug: "madina",
    name: "The Madina",
    category: "koofis",
    price: 68,
    fabric: "Cream wool",
    weight: "Hand crochet",
    colorName: "Cream",
    swatch: "ivory",
    summary: "A hand-crocheted cream koofi with an open stitch and a rolled edge.",
    story:
      "Close to the head, and breathable in a way a machine knit is not. Made in small batches. Koofi is our spelling of the kufi cap.",
    composition: "100% wool, hand crochet.",
    care: "Cold hand wash. Reshape over a bowl and dry flat. Do not tumble.",
    fit: "Circumference in centimeters. 56 fits most. Between sizes, take the larger.",
    sizes: KOOFI_SIZES,
    image: "/products/madina.jpg",
    featured: true,
  },
  {
    slug: "makkah",
    name: "The Makkah",
    category: "koofis",
    price: 62,
    fabric: "Charcoal cotton knit",
    weight: "Fine rib",
    colorName: "Charcoal",
    swatch: "charcoal",
    summary: "A low charcoal knit that sits under a scarf without bulk.",
    story:
      "A fine rib that recovers its shape. The profile is lower than the Madina, for days when you want the cap to disappear.",
    composition: "100% cotton knit.",
    care: "Cool wash. Dry flat. Do not stretch the rib while it is wet.",
    fit: "54 to 60 cm. The rib flexes, so 56 is the safe choice.",
    sizes: KOOFI_SIZES,
    image: "/products/makkah.jpg",
    featured: false,
  },
  {
    slug: "atlas",
    name: "The Atlas",
    category: "koofis",
    price: 78,
    fabric: "Sand linen",
    weight: "Bound edge",
    colorName: "Sand",
    swatch: "sand",
    summary: "A lightly structured sand linen koofi with a bound edge.",
    story:
      "It holds a shape the crochet does not. Named for a wool route, cut from linen, because linen keeps its line in heat.",
    composition: "100% linen, with a bound edge in the same cloth.",
    care: "Steam to refresh. Spot clean. If you wash it, do so cold and reshape it at once.",
    fit: "Less give than the knits. Measure, and do not size down.",
    sizes: KOOFI_SIZES,
    image: "/products/atlas.jpg",
    featured: true,
  },
  {
    slug: "sahra",
    name: "The Sahra",
    category: "koofis",
    price: 85,
    fabric: "Olive wool",
    weight: "Embroidered rim",
    colorName: "Olive",
    swatch: "olive",
    summary: "Deep olive wool with a narrow embroidered rim in the same yarn.",
    story:
      "The rim is visible only up close. Firmer than the Madina, and quieter than anything stitched in a contrast thread.",
    composition: "Wool felt body. Embroidered rim in matching wool.",
    care: "Brush with a clothes brush. Steam, do not soak. Keep it out of hard sun between wears.",
    fit: "Structured, so the centimeter is honest. 58 is the full fit.",
    sizes: KOOFI_SIZES,
    image: "/products/sahra.jpg",
    featured: false,
  },
];

const editOrder = ["qasr", "safa", "madina", "marjan", "noor", "atlas"];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}

export function editPieces() {
  return editOrder.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });
}

export function relatedProducts(slug: string) {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((product) => product.category === current.category && product.slug !== slug)
    .slice(0, 3);
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}
