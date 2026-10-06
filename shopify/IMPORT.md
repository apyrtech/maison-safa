# Put Maison Safa on Shopify

The preview site is a custom React app. Shopify cannot import that app as a store. This folder is the convertible version: a theme that matches the house, and a product file with the twelve pieces.

Give yourself about fifteen minutes in the Shopify admin. Set the store currency to **USD** before importing, because the catalog is priced in dollars. If the store uses another currency, the numbers will be read as that currency.

## 1. Import the pieces

1. In Shopify admin, go to **Products → Import**.
2. Upload `products.csv` from this folder.
3. Confirm the import. You should see twelve products: The Qasr through The Sahra. Each size is a variant. Pieces are marked to keep selling when stock is empty, which matches cut-to-order.

Photographs are pulled from the public GitHub repository. After import they live on Shopify’s own image host, so you can disconnect GitHub later.

## 2. Make the three collections

Go to **Products → Collections → Create collection**. Create three **automated** collections. The handle is set from the title; it must stay exactly as written.

| Title  | Handle  | Condition                                      |
| ------ | ------- | ---------------------------------------------- |
| Thobes | thobes  | Product tag is equal to `thobes`               |
| Abayas | abayas  | Product tag is equal to `abayas`               |
| Koofis | koofis  | Product tag is equal to `koofis`               |

The shop link uses Shopify’s built-in **All** collection. Leave that available.

## 3. Upload the theme

1. Zip the `theme` folder so the zip opens onto `layout`, `templates`, `sections`, and the rest — not an extra folder. A ready zip is at `maison-safa-shopify-theme.zip` next to this file.
2. **Online Store → Themes → Add theme → Upload zip**.
3. Preview it, then **Publish** when you want it live.

## 4. Add the atelier page

1. **Online Store → Pages → Add page**.
2. Title: `The atelier`. The handle must be `atelier` (the link is `/pages/atelier`).
3. In the theme template list on the right, choose **atelier**.
4. Save. The page copy is already in the theme, so the body can stay empty.

## 5. Shipping

The bag mentions complimentary shipping from 280. That note does not create the rule. Under **Settings → Shipping and delivery**, add a free rate when the order is at least $280 for the countries you ship to.

Checkout, payments, taxes, and emails are Shopify’s. The theme only draws the house.
