"use client";

const TICKER_TEXT =
  "This week: Ethiopia Guji Natural · Roast date: printed on every bag · Guatemala Huehuetenango Washed · Colombia Nariño Honey · From one farm. One harvest. One lot. · ";

export default function MarqueeTicker() {
  const repeated = TICKER_TEXT + TICKER_TEXT;

  return (
    <div className="w-full bg-ember-dark overflow-hidden py-5 marquee-container" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        <span className="font-body text-bone tracking-[0.12em] uppercase text-[13px] md:text-[15px] pr-0">
          {repeated}
        </span>
        <span className="font-body text-bone tracking-[0.12em] uppercase text-[13px] md:text-[15px] pr-0" aria-hidden="true">
          {repeated}
        </span>
      </div>
    </div>
  );
}
