import React, { ReactNode } from 'react';

interface CategoryBoxProps {
    name: string;
    children?: ReactNode;
}

export default function CategoryBox({ name, children }: CategoryBoxProps) {
    
    return (

<>
    <div className="flex flex-col">
    
        <span className="text-[26px] flex justify-center" >{name}</span>
        
        <div className="border-4 h-40 m-2 w-[30vh]">
            {children}
        </div>

</div>
        </>
    );

}