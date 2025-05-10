"use client";

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
            {openModel && (
                <div className="absolute  gap-y-2 flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white/10 z-10 p-12 rounded-xl backdrop-blur-3xl border-blue-300 shadow-2xl shadow-cyan-500/50 border-solid border-[0.2px] ">
                    <input
                        className="box-border  tracking-wider border-2 border-gray-800/50 p-2  focus:border-blue-500 rounded outline-0"
                        type="text"
                        placeholder="Recipe Name"
                    />
                    <input
                        className="box-border tracking-wider border-2 border-gray-800/50 p-2 focus:border-blue-500 rounded outline-0"
                        type="text"
                        placeholder="Good / Bad / Average"
                    />
                    <div className="flex border-[0.8px] overflow-scroll flex-wrap border-gray-800/50 p-1 rounded  gap-1 min-h-16">
                        {ingredients.map((ingredient, index) => {
                            if (ingredient !== "") {
                                return (
                                    <div
                                        className="rounded flex justify-center items-center  border-[0.8px] h-fit  border-gray-800/50 p-1"
                                        key={index}
                                    >
                                        {ingredient}
                                        <button
                                            className="m-1"
                                            onClick={() =>
                                                setIngredients(() =>
                                                    ingredients.filter(
                                                        (a, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                className="hover:fill-blue-500 fill-gray-500"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="11"
                                                />

                                                <path
                                                    fill="white"
                                                    d="M15.54 8.46L13.41 10.59L15.54 12.71L14.12 14.12L12 12L9.88 14.12L8.46 12.71L10.59 10.59L8.46 8.46L9.88 7.05L12 9.17L14.12 7.05L15.54 8.46Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="flex rounded pr-2 border-2  border-gray-600/50 focus-within:border-blue-500">
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setIngredient(e.target.value)}
                            className="box-border p-2 tracking-wider  rounded outline-0"
                            type="text"
                            placeholder="Ingredients"
                        />
                        <button
                            className="cursor-pointer"
                            onClick={() =>
                                setIngredients([...ingredients, ingredient])
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                className="hover:fill-blue-500 fill-gray-500"
                            >
                                <circle cx="12" cy="12" r="11" />

                                <path
                                    fill="white"
                                    d="M13 11V6.5h-2V11H6.5v2H11v4.5h2V13h4.5v-2z"
                                />
                            </svg>
                        </button>
                    </div>
                    <textarea
                        name="preparation"
                        id="preparation"
                        className="outline-0 rounded min-h-16 border-2 p-2 border-gray-800/50  focus:border-blue-500"
                        placeholder="Preparartion"
                    ></textarea>
                    <div className="flex justify-around ">
                        <button className="cursor-pointer px-4 py-1 rounded-lg hover:bg-cyan-600 bg-cyan-500 shadow-lg shadow-cyan-500/50 ">
                            Prepare
                        </button>
                        <button
                            className="cursor-pointer px-4 py-1 rounded-md shadow-lg hover:bg-red-600 bg-red-500 shadow-red-500/50"
                            onClick={() => setOpenModel(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <button
                onClick={() => setOpenModel(true)}
                className="border-4 mt-2 w-96 border-gray-950 bg-slate-800 hover:bg-opacity-20 active:bg-black"
            >
                + New
            </button>
        </div>
    );
}
