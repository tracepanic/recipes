import { FormEvent, useState } from "react";

interface Props {
    open: boolean;
    setOpen: (value: React.SetStateAction<boolean>) => void;
    ingredient: string;
    setIngredient: (value: string) => void;
    ingredients: string[];
    setIngredients: (value: React.SetStateAction<Array<string>>) => void;
}
// When the recipe is created successfully:
export interface RecipeSuccess {
    _id: string; // the new recipe’s ID
    acknowledged: boolean; // always true for successful insertOne
    insertedId: string; // same as _id, if you spread the insertOne result
}

// When validation fails (400):
export interface ValidationError {
    error: {
        field: string; // e.g. "name" or "category"
        message: string; // e.g. "Name must be at least 3 characters"
    };
}

// When something else goes wrong (500):
export interface ServerError {
    error: string; // e.g. "Failed to create recipe"
}

// Union of all possible responses:
export type RecipeResponse = RecipeSuccess | ValidationError | ServerError;

export const RecipeModel = ({
    open,
    setOpen,
    ingredient,
    setIngredients,
    ingredients,
    setIngredient,
}: Props) => {
    const [msg, setMsg] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        try {
            const res = await fetch("/api/recipes", {
                method: "POST",
                body: JSON.stringify({
                    name: form.get("recipe"),
                    category: form.get("category"),
                    smiley: form.get("smiley"),
                    ingredients: ingredients,
                    preparation: form.get("preparation"),
                }),
            });
            const oldForm = e.target as HTMLFormElement;
            const data = (await res.json()) as RecipeResponse;
            if (res.ok) {
                setMsg("Recipe added successfully.");
            } else if (res.status < 500) {
                setMsg("Please fill the form correctly");
            } else if ("error" in data) {
                // 400 validation vs 500 server
                if (typeof data.error === "string") {
                    // ServerError
                    setMsg(data.error);
                } else {
                    // ValidationError
                    setMsg(`${data.error.message}`);
                }
            }
            oldForm.reset();
            setIngredients([]);
        } catch (err) {
            console.log(err);
        }
    };
    if (open) {
        return (
            <div className="absolute flex items-center flex-col gap-y-2 top-[50%] left-[50%]  translate-[-50%]  bg-white/10 z-100 p-12 rounded-xl backdrop-blur-3xl border-blue-300 shadow-2xl shadow-cyan-500/50  border-[0.2px] ">
                {msg && msg.includes("successfully") ? (
                    <div className="text-green-600">{msg}</div>
                ) : (
                    <div className="text-red-600">{msg}</div>
                )}
                <form
                    id="myForm"
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col gap-y-2"
                >
                    <input
                        className="box-border tracking-wider border-2 border-gray-800/50 p-2 focus:border-blue-300 rounded outline-0"
                        type="text"
                        name="recipe"
                        pattern="(?:[a-zA-Z].*?[a-zA-Z])"
                        title="Enter at least two character"
                        placeholder="Recipe Name"
                        required={true}
                    />
                    <input
                        name="smiley"
                        className="box-border tracking-wider border-2 border-gray-800/50 p-2 focus:border-blue-300 rounded outline-0"
                        type="text"
                        placeholder="Good / Bad / Average"
                        pattern="^(good|bad|average)$"
                        required
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.toLowerCase();
                        }}
                        title="Enter bad or good or average"
                    />
                    <input
                        name="category"
                        className="box-border tracking-wider border-2 border-gray-800/50 p-2 focus:border-blue-300 rounded outline-0"
                        type="text"
                        placeholder="Enter a category"
                        pattern="^(breakfast|lunch|snack|dinner)$"
                        required
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.toLowerCase();
                        }}
                        title="Enter Breakfast or Lunch or Snack or Dinner"
                    />
                    <div className="flex border-[0.8px]  flex-wrap border-gray-800/50 p-1 rounded  gap-1 min-h-16">
                        {ingredients.map((ingredient, index) =>
                            ingredient ? (
                                <div
                                    className="rounded flex justify-center items-center  border-[0.8px] h-fit  border-gray-800/50 p-1"
                                    key={index}
                                >
                                    {ingredient}
                                    <div
                                        className="m-1"
                                        role="button"
                                        aria-label={`Remove ${ingredient}`}
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
                                            <circle cx="12" cy="12" r="11" />

                                            <path
                                                fill="white"
                                                d="M15.54 8.46L13.41 10.59L15.54 12.71L14.12 14.12L12 12L9.88 14.12L8.46 12.71L10.59 10.59L8.46 8.46L9.88 7.05L12 9.17L14.12 7.05L15.54 8.46Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                    <div className="flex rounded pr-2 border-2 items-center border-gray-800/50 focus-within:border-blue-300">
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setIngredient(e.target.value)}
                            className="box-border p-2 tracking-wider rounded outline-0"
                            type="text"
                            placeholder="Ingredients"
                            value={ingredient}
                        />
                        <div
                            className="cursor-pointer h-fit"
                            role="button"
                            aria-label={`Add ${ingredient}`}
                            onClick={() => {
                                if (ingredient) {
                                    setIngredients([
                                        ...ingredients,
                                        ingredient,
                                    ]);
                                }
                                setIngredient("");
                            }}
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
                        </div>
                    </div>
                    <textarea
                        name="preparation"
                        id="preparation"
                        className="outline-0 rounded min-h-16 border-2 p-2 border-gray-800/50  focus:border-blue-300"
                        placeholder="Preparartion"
                        required={true}
                    ></textarea>
                    <div className="flex justify-around ">
                        <button
                            type="submit"
                            className="cursor-pointer px-4 py-1 rounded-lg hover:bg-cyan-600 bg-cyan-500 shadow-lg shadow-cyan-500/50 "
                        >
                            Prepare
                        </button>
                        <button
                            className="cursor-pointer px-4 py-1 rounded-md shadow-lg hover:bg-red-600 bg-red-500 shadow-red-500/50"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};
