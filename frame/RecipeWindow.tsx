"use client";
import { RecipeModel } from "./RecipeModel";
import React, { ReactNode, useState } from "react";

interface CategoryWindowProps {
    id: string;
    children?: ReactNode;
}

export default function Recipes_Window({ id, children }: CategoryWindowProps) {
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [ingredient, setIngredient] = useState<string>("");
    const [ingredients, setIngredients] = useState<Array<string>>([""]);
    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDragEnd = (e: any) => {
        const id = e.dataTransfer.getData("text/plain");
        console.log(id);
        if (e.target.id == "valid") {
            console.log("Erfolgreich gedroppt:", id);
            e.target.append(document.getElementById(id));
        } else {
            console.log("Falsches Element! Nicht erlaubt.");
        }
    };

    return (
        <div className="flex font-mono flex-col items-center">
            <div
                className="border-10 relative border-black rounded-2xl w-96 dark:bg-slate-700 flex flex-col  h-[50vh] p-2"
                id={id}
                onDragOver={handleDragOver}
                onDrop={handleDragEnd}
            >
                {children}
            </div>
            <RecipeModel
                ingredient={ingredient}
                ingredients={ingredients}
                open={openModel}
                setIngredient={setIngredient}
                setIngredients={setIngredients}
                setOpen={setOpenModel}
            />
            <button
                onClick={() => setOpenModel(true)}
                className="border-4 mt-2 w-96 border-gray-950 bg-slate-800 hover:bg-opacity-20 active:bg-black"
            >
                + New
            </button>
        </div>
    );
}
