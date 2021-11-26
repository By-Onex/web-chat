import React from 'react'
import style from './MyInput.module.css';

export default function MyInput({...props}) {
    return (
        <input {...props} className={style.input}>
            
        </input>
    )
}
