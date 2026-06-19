import type { Product } from "@/lib/checkout";
import { fetchProducts } from "@/lib/checkout";

/**
 * Catalog. Live products come from the LinkWorld API (fetchProducts); this demo
 * list is the fallback so the site always renders. REPLACE these with the
 * company's real products (name/description/price/image_url). The `Product`
 * type is MANAGED (src/lib/checkout.ts): the key field is `id` (string) — NOT
 * `product_id`. Use real generated images for image_url.
 */
export const CATALOG: Product[] = [
  { id: "demo-1", name: "Product One", description: "Replace with a real product.", price_cents: 4900, currency: "EUR", image_url: null, stock: null },
  { id: "demo-2", name: "Product Two", description: "Replace with a real product.", price_cents: 7900, currency: "EUR", image_url: null, stock: null },
  { id: "demo-3", name: "Product Three", description: "Replace with a real product.", price_cents: 6500, currency: "EUR", image_url: null, stock: null },
];

/** Live products when configured, else the demo catalog. */
export async function getProducts(): Promise<Product[]> {
  const live = await fetchProducts();
  return live.length ? live : CATALOG;
}
