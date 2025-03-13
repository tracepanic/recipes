import React, { ReactNode } from 'react';

interface CategoryWindowProps {
    children?: ReactNode;
}

export default function CategoryBox({ children }: CategoryWindowProps) {
    return (
        <div className="border-10 h-[50vh] m-2 flex flex-row flex-wrap bg-slate-700">
            {children}
        </div>
    );
}
