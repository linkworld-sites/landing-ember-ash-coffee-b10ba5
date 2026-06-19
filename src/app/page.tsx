import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import FeaturedShop from "@/components/FeaturedShop";
import FarmStory from "@/components/FarmStory";
import HowWeRoast from "@/components/HowWeRoast";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import TastingNotes from "@/components/TastingNotes";
import GiftSetsSection from "@/components/GiftSetsSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Ember & Ash Coffee — Roasted to Order",
  description:
    "Single-origin, roast-to-order coffee. Every bag carries a traceable origin story and a roast date you can trust.",
};

export default function Home() {
  return (
    <main className="bg-parchment">
      <HeroSection />
      <MarqueeTicker />
      <FeaturedShop />
      <FarmStory />
      <HowWeRoast />
      <SubscriptionsSection />
      <TastingNotes />
      <GiftSetsSection />
      <SiteFooter />
    </main>
  );
}
