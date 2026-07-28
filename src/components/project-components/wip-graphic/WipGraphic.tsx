"use client";

import { twMerge } from "tailwind-merge";

const WipGraphic = () => {
  const brandName = "SaRe";
  const commonStyle =
    "text-9xl tracking-tighter hover:opacity-20 select-all cursor-pointer";

  const listElementStyles = [
    { styles: [] },
    { styles: ["italic"] },
    { styles: ["font-bold", "indent-8"] },
    { styles: ["font-extrabold", "italic"] },
    { styles: ["font-extralight", "tracking-wide", "indent-7"] },
    { styles: ["font-extralight", "italic", "bg-violet-200"] },
    { styles: ["font-serif", "underline", "decoration-1"] },
    { styles: ["font-mono", "tracking-widest", "text-shadow-lg", "font-bold"] },
    { styles: ["font-light", "line-through", "opacity-60"] },
    { styles: ["text-5xl", "font-extralight", "underline", "decoration-wavy"] },
    { styles: ["skew-x-12"] },
    { styles: ["italic"] },
    { styles: ["font-bold", "indent-8"] },
    { styles: ["font-extrabold", "italic", "py-5"] },
    { styles: ["font-extralight", "tracking-wide", "indent-7"] },
    { styles: ["font-extralight", "italic"] },
    { styles: ["font-serif", "underline", "decoration-1", "skew-2"] },
    { styles: ["font-mono", "tracking-widest", "text-shadow-lg"] },
    { styles: ["text-3xl", "font-light", "line-through", "opacity-60"] },
    { styles: ["font-extralight", "underline", "decoration-wavy"] },
    { styles: [] },
    { styles: ["italic"] },
    { styles: ["font-bold", "indent-8", "bg-amber-200"] },
    { styles: ["font-extrabold", "italic"] },
    { styles: ["font-extralight", "tracking-wide", "indent-7"] },
    { styles: ["font-extralight", "italic", "skew-x-12"] },
    { styles: ["font-serif", "underline", "decoration-1"] },
    { styles: ["font-mono", "tracking-widest", "text-shadow-lg"] },
    { styles: ["font-light", "line-through", "opacity-60"] },
    { styles: ["font-extralight", "underline", "decoration-wavy"] },
  ];

  const renderItems = (keyPrefix: string) =>
    listElementStyles.map((elementStyles, index) => (
      <li key={`${keyPrefix}-${index}`} aria-hidden={keyPrefix !== "original"}>
        <p className={twMerge(commonStyle, elementStyles.styles)}>
          {brandName}
        </p>
      </li>
    ));

  return (
    <div className="h-screen w-full bg-amber-50/20 overflow-hidden">
      <ul className="animate-scroll-up m-0 p-0 list-none flex flex-col">
        {renderItems("original")}
        {renderItems("copy-1")}
      </ul>
    </div>
  );
};

export default WipGraphic;
