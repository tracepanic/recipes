"use client";
import Image, { StaticImageData } from "next/image";
import good_emoji from "../assets/good_emoji.png";

import middle_emoji from "../assets/middle_emoji.png";
import bad_emoji from "../assets/bad_emoji.png";
import { useState, useEffect, useRef, DragEvent } from "react";

interface RecipeProps {
    name: string;
    id: string;
    emoji: "good" | "middle" | "bad";
}

const emojiMap: Record<RecipeProps["emoji"], StaticImageData> = {
    good: good_emoji,
    middle: middle_emoji,
    bad: bad_emoji,
};

const Recipe = ({ id, name, emoji }: RecipeProps) => {
    let emojii = emojiMap[emoji] ?? good_emoji;

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handlePictureDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            id={id}
            className="flex z-99 my-1   w-[98%] hover:cursor-grab translate-x-[-50%] left-[50%] border-2 p-2 relative border-gray-800 rounded-2xl"
            draggable
            onDragStart={handleDragStart}
        >
            <div
                className="border-4 rounded-2xl border-black p-2 mr-2"
                onDragStart={handlePictureDragStart}
            >
                <Image width={30} height={30} src={emojii} alt={emoji} />
            </div>

            <span className="text-white text-[26px]">{name}</span>
        </div>
    );
};
export default Recipe;
