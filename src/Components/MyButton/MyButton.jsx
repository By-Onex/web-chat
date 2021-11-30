import React from 'react'
import style from './MyButton.module.css';

export default function MyButton({...props}) {
    return (
        <div {...props} className={style.btn}>
            {props.children}
        </div>
    )
}
