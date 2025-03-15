'use client'


import React, { ReactNode } from 'react';

interface CategoryWindowProps {
    children?: ReactNode;
}

export default function CategoryWindow({ children }: CategoryWindowProps) {


    return (
        <div className="border-10 w-7xl h-[50vh] rounded-2xl border-black m-2 flex flex-row flex-wrap bg-slate-700">
            {children}
        </div>
    );
}
