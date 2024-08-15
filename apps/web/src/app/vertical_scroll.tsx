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
  scrollDirection?: "up" | "down"; // Add this new parameter
}

const Scroller: React.FC<Props> = ({
  items,
  className = "",
  imageClass = "",
  scrollDirection = "up", // Default scroll direction is "up"
}) => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller__inner");

    scrollers.forEach((scrollerElement) => {
      const scroller = scrollerElement as HTMLElement;

      if (scroller) {
        // Remove any existing duplicated content to prevent multiple duplications
        const existingDuplicate = scroller.nextElementSibling;
        if (
          existingDuplicate &&
          existingDuplicate.getAttribute("aria-hidden") === "true"
        ) {
          existingDuplicate.remove();
        }

        // Clone and append the duplicated content
        const duplicatedContent = scroller.cloneNode(true) as HTMLElement;
        duplicatedContent.setAttribute("aria-hidden", "true");

        // For scrolling down, the duplicated content needs to be positioned after the original content
        scroller.parentElement?.appendChild(duplicatedContent);

        // Adjust the transform of the original content for downward scrolling
        if (scrollDirection === "down") {
          scroller.style.transform = "translateY(100%)";
        }
      }
    });
  }, [scrollDirection]); // Re-run effect if scrollDirection changes

  // Determine the animation class based on the scrollDirection prop
  const verticalAnimationClass =
    scrollDirection === "up"
      ? "animate-infinite-vertical-scroll"
      : "animate-infinite-vertical-scroll-down";

  return (
    <div className="w-full md:w-52 flex flex-row md:flex-col h-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] md:[mask-image:_linear-gradient(to_bottom,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      {/* Horizontal scroll for small screens */}
      <div className="scroller__inner flex flex-row md:hidden animate-infinite-horizontal-scroll">
        {items.map((item, index) => (
          <div
            key={index}
            className={`mx-3 w-32 border border-dashed border-[#f59e5b] flex flex-col justify-between shrink-0 overflow-hidden ${className}`}
          >
            <div className="bg-gradient-to-br h-56">
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

      {/* Vertical scroll for medium and larger screens */}
      <div
        className={`scroller__inner hidden md:flex flex-col ${verticalAnimationClass}`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`mb-4 md:w-52 border border-dashed border-[#f59e5b] flex flex-col justify-between shrink-0 overflow-hidden ${className}`}
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

export default Scroller;
