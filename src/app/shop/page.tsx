import { fetchProducts } from "@/lib/checkout";
import ShopPageClient from "@/components/ShopPageClient";

export const metadata = {
  title: "Shop — Ember & Ash Coffee",
  description: "Single-origin coffees, roasted to order. Every bag carries a roast date.",
};

export default async function ShopPage() {
  const products = await fetchProducts();
  return <ShopPageClient initialProducts={products} />;
}
