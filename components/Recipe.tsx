"use client";
import Image, { StaticImageData } from "next/image"; // Falls du Next.js nutzt
import good_emoji from "../assets/good_emoji.png";

import middle_emoji from "../assets/middle_emoji.png";
import bad_emoji from "../assets/bad_emoji.png";
import { useEffect, useRef } from "react";

interface RecipeProps {
  name: string;
  emoji: "good" | "middle" | "bad";
}

const emojiMap: Record<RecipeProps["emoji"], StaticImageData> = {
  good: good_emoji,
  middle: middle_emoji,
  bad: bad_emoji,
};

export default function Recipe({ name, emoji }: RecipeProps) {
  const emojii = emojiMap[emoji] ?? good_emoji;
  const draggableElement = useRef<HTMLDivElement>(null);
  function dragElement(e: React.MouseEvent<HTMLDivElement>) {
    let startDivX = 0,
      startDivY = 0,
      startMouseX = 0,
      startMouseY = 0;
    if (draggableElement.current) {
      startDivX = draggableElement.current.offsetLeft;
      startDivY = draggableElement.current.offsetTop;
    }
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", closeDragElement);

    function moveElement(e: MouseEvent) {
      console.log("moving the div");

      if (draggableElement.current) {
        draggableElement.current.style.left =
          startDivX + (e.clientX - startMouseX) + "px";
        draggableElement.current.style.top =
          startDivY + (e.clientY - startMouseY) + "px";
      }
    }

    function closeDragElement(e: MouseEvent) {
      //HERE i am currently working.

      // console.log("Mouse up position:", { x: e.clientX, y: e.clientY });

      // const droppedElement = document.elementFromPoint(e.clientX, e.clientY);

      // // Temporarily hide the dragged element so it doesn't block elementFromPoint
      // const draggedElement = draggableElement.current!;
      // draggedElement.style.display = "none";

      // // Get the element underneath the dragged item
      // const droppedContainer = document.elementFromPoint(e.clientX, e.clientY);

      // // Show the dragged element again
      // draggedElement.style.display = "flex";

      // if (droppedContainer) {
      //   console.log("Dropped inside:", droppedContainer);

      //   // Find the closest valid container (e.g., a div with a specific class)
      //   const validContainer = droppedContainer.closest(".box");
      //   if (validContainer) {
      //     validContainer.appendChild(draggedElement);
      //     console.log("Moved successfully to:", validContainer);
      //   } else {
      //     console.log("Not a valid drop target.");
      //   }
      // } else {
      //   console.log("No element found at drop position.");
      // }

      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", moveElement);
    }
  }
  return (
    <div
      ref={draggableElement}
      onMouseDown={(e) => dragElement(e)}
      className="flex z-99  w-[98%] hover:cursor-grab translate-x-[-50%] left-[50%] absolute border-2 p-2  border-gray-800 rounded-2xl"
    >
      <div className="border-4 rounded-2xl border-black p-2 mr-2">
        {/* Falls du Next.js benutzt, verwende <Image /> */}
        <Image width={30} height={30} src={emojii} alt={emoji} />
      </div>
      <span className="text-white text-[26px]">{name}</span>
    </div>
  );
}
