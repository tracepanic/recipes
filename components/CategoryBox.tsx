"use client";
import React, { DragEventHandler, ReactNode, DragEvent } from "react";

interface CategoryBoxProps {
    id: string;
    name: string;
    children?: ReactNode;
}

const CategoryBox = ({ id, name, children }: CategoryBoxProps) => {
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        const id = e.dataTransfer.getData("text/plain");

        console.log(e.target.closest("#valid"));

        if (e.target.id == "valid") {
            console.log("Erfolgreich gedroppt:", id);
            e.target.append(document.getElementById(id));
        } else {
            console.log("Falsches Element! Nicht erlaubt.");
        }

        if (e.target.closest("#valid")) {
            const t = e.target.closest("#valid");
            t.append(document.getElementById(id));
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <span className="text-[26px] flex justify-center">{name}</span>

                <div
                    className="border-4 relative py-2 rounded-2xl border-black min-h-40 m-2 w-[30vh]"
                    id={id}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e)}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default CategoryBox;
