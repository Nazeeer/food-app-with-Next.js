'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInValidText(text){
  return !text ;
}

export async function shareMeal(prevState , formData){

    const meal ={
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    if(isInValidText(meal.title) || 
    isInValidText(meal.summary) || 
    isInValidText(meal.instructions) || 
    isInValidText(meal.image) || 
    isInValidText(meal.creator_email) || 
    isInValidText(meal.creator)||
    !meal.creator_email.includes('@')||
    !meal.image || meal.image.size === 0
    ){
      return{
        message: 'Invalid input.'
      }
    }
    // console.log(meal);
    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
  }