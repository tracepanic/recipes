import Categories from '../frame/CategoryBox';

import Recipes_Window from '../frame/RecipeWindow';

import Recipe from '../components/Recipe';
import CategoryBox from '../components/Category';

export default function MainWindow() {
  return (
<>
                        {/* Two Blocks for left ("Cooking Time", "Recipes") and right ("Categories") */}
                        <div className='flex bg-slate-900'>
                    
                                {/* Left Block */}
                            <div className='block m-4'>
                                
                                {/* Cooking Time */}
                                <div className='border-8 h-[40vh] mb-10 bg-slate-700'>
                                    <span>Cooking Time</span>
                                </div>
                           
                                {/* Recipes */}
                                <Recipes_Window>
                                    <Recipe name="Noodels" emoji="middle"></Recipe>
                                    <Recipe name="Cake" emoji="bad"></Recipe>
                                </Recipes_Window>
                    
                         </div>
                    
                        {/* Right Block: Categories*/}    
                        <div className=' m-4 flex flex-wrap'>
                            <Categories>
                    
                                <CategoryBox name="Breakfast">
                                    <Recipe name="Toast" emoji="middle"></Recipe>
                                </CategoryBox>
                    
                                <CategoryBox name="Lunch">
                                    <Recipe name="Eggs" emoji="good"></Recipe>
                                </CategoryBox>
                    
                                <CategoryBox name="Snack">
                                    <Recipe name="Cake" emoji="good"></Recipe>
                                </CategoryBox>
                    
                                <CategoryBox name="Dinner">
                                    <Recipe name="Something" emoji="good"></Recipe>
                                </CategoryBox>
                    
                            </Categories>
                        </div>
                    
                       
                        </div>
                                
                        
                        </>
  );
}