"use client";

import React, { ReactNode } from "react";

interface CategoryWindowProps {
    children?: ReactNode;
}

export default function Recipes_Window({ children }: CategoryWindowProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="border-10 relative border-black rounded-2xl w-96 dark:bg-slate-700 flex flex-col  h-[50vh] p-2">
                {children}
            </div>

            <button className="border-4 mt-2 w-96 border-gray-950 bg-slate-800 hover:bg-opacity-20 active:bg-black">
                + New
            </button>
        </div>
    );
}
