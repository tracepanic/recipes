import CategoryWindow from "../frame/CategoryWindow";

import Recipes_Window from "../frame/RecipeWindow";

import Recipe from "../components/Recipe";
import Recipe2 from "../components/Recipe2";

import CategoryBox from "../components/CategoryBox";

export default function MainWindow() {
    return (
        <>
            {/* Two Blocks for left ("Cooking Time", "Recipes") and right ("Categories") */}
            <div className="flex bg-slate-900">
                {/* Left Block */}
                <div className="block m-4">
                    {/* Cooking Time */}
                    <div className="border-10 border-black rounded-2xl h-[40vh] mb-10 bg-slate-700">
                        <span>Cooking Time</span>
                    </div>

                    {/* Recipes */}
                    <Recipes_Window id="valid">
                        <Recipe2 id="1" name="Noodels" emoji="good"></Recipe2>
                    </Recipes_Window>
                </div>

                {/* Right Block: Categories*/}
                <div className=" m-4 flex flex-wrap">
                    <CategoryWindow>
                        <CategoryBox id="valid" name="Breakfast">
                            <Recipe2 id="2" name="Toast" emoji="good"></Recipe2>
                        </CategoryBox>

                        <CategoryBox id="valid" name="Lunch">
                            <Recipe2
                                id="3"
                                name="Eggs"
                                emoji="middle"
                            ></Recipe2>
                        </CategoryBox>

                        <CategoryBox id="valid" name="Snack">
                            <Recipe2 id="4" name="Cake" emoji="bad"></Recipe2>
                        </CategoryBox>

                        <CategoryBox id="valid" name="Dinner">
                            <Recipe2
                                id="5"
                                name="Noodels"
                                emoji="good"
                            ></Recipe2>
                        </CategoryBox>
                    </CategoryWindow>
                </div>
            </div>
        </>
    );
}
