import Image, { StaticImageData } from 'next/image'; // Falls du Next.js nutzt
import good_emoji from '../assets/good_emoji.png';
import middle_emoji from '../assets/middle_emoji.png';
import bad_emoji from '../assets/bad_emoji.png';

interface RecipeProps {
    name: string;
    emoji: "good" | "middle" | "bad";
}

const emojiMap: Record<RecipeProps["emoji"], StaticImageData> = {
    good: good_emoji,
    middle: middle_emoji,
    bad: bad_emoji
};

export default function Recipe({ name, emoji }: RecipeProps) {
    const emojii = emojiMap[emoji] ?? good_emoji;

    return (
        <div className="flex border-2 m-1 p-2 border-gray-800">
            <div className="border-4 border-black p-2 mr-2">
                {/* Falls du Next.js benutzt, verwende <Image /> */}
                <Image width={30} height={30} src={emojii} alt={emoji} />
            </div>
            <span className="text-white text-[26px]">{name}</span>

        </div>
    );
}
