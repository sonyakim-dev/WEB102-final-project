import { useState } from "react";

function Card({ name, image, segment="", genre="", subgenre="" }) {
  return (
    <div className="relative max-w-xs rounded overflow-hidden shadow-lg m-2">
      <img
        className="w-80 h-30 aspect-[4/3] object-cover"
        src={image}
        alt="Sunset in the mountains"
      />

      <div className="px-6 pt-4 whitespace-nowrap">
        <div className="font-bold text-xl mb-2">{name}</div>
      </div>

      <div className="px-4 pb-2 overflow-x-auto flex flex-row whitespace-nowrap scrollbar-hide scroll-smooth">
        {segment && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{segment}
        </span>}
        {genre && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{genre}
        </span>}
        {subgenre && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{subgenre}
        </span>}
      </div>
    </div>
  );
}

export default Card;
