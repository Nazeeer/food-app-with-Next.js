'use client';

import { useRef, useState } from 'react';
import Image from 'next/image'

import classes from './image-picker.module.css'
export default function ImagePicker({label,name}){
    const [pickedImage , setPickedImage] = useState()
    const imageInputRef = useRef();
    // console.log(imageInputRef);
    function handlePickClick(){
        imageInputRef.current.click();
    }

    function handleImageChange (e){
        const file = e.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload= ()=>{
            // console.log(fileReader.result);
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }


    return <div className={classes.picker}>
        
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image Picked yet.</p>}
                {pickedImage && (<Image src={pickedImage} alt='the image selected by the user.' fill />)}
            </div>
            <input 
                className={classes.input}
                required
                type='file' 
                id={name} 
                accept="image/png, image/jpeg" 
                name={name}
                ref={imageInputRef}
                onChange={handleImageChange}
            />
            <button className={classes.button} type='button' onClick={handlePickClick}>Pick an image</button>
        </div>
    </div>
}