"use client";

import React, { useEffect } from "react";

interface CardItem {
  name: string;
  photoUrl: string;
  // other fields if necessary
}

interface Props {
  items: CardItem[];
  className?: string;
  imageClass?: string;
}

const ReverseVerticalScroller: React.FC<Props> = ({
  items,
  className = "",
  imageClass = "",
}) => {
  useEffect(() => {
    const scroller = document.querySelector(".scroller__inner");

    if (scroller) {
      const duplicatedContent = scroller.cloneNode(true) as HTMLElement;
      duplicatedContent.setAttribute("aria-hidden", "true");
      scroller.parentElement?.appendChild(duplicatedContent);
    }
  }, []);

  return (
    <div className="w-full md:w-52 flex flex-row md:flex-col h-full overflow-hidden">
      <div className="scroller__inner flex flex-row md:flex-col animate-infinite-horizontal-scroll-reverse md:animate-infinite-vertical-scroll-reverse">
        {items.map((item, index) => (
          <div
            key={index}
            className={`mx-3 md:mx-0 w-32 md:w-52 border border-dashed border-[#f59e5b] flex flex-col justify-between shrink-0 overflow-hidden ${className}`}
          >
            <div className="bg-gradient-to-br h-56 md:h-full">
              <img
                src={item.photoUrl}
                alt={item.name}
                className={`object-cover h-full border-b border-dashed border-[#f59e5b] ${imageClass}`}
              />
            </div>
            <div className="border-gray-700 px-5 py-4 text-center flex flex-col justify-center items-center gap-2">
              <p className="text-base font-semibold text-[#f59e5b] leading-tight">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReverseVerticalScroller;
