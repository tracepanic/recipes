import React from 'react';

export default function Recipes_Window({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            <div className="border-2 w-96 dark:bg-slate-700 flex flex-col overflow-auto overflow-x-hidden h-[50vh] p-2">
                {children}
            </div>

            <button className="border-4 mt-2 w-96 border-gray-950 bg-slate-800 hover:bg-opacity-20 active:bg-black">
                + New
            </button>
        </div>
    );
}
