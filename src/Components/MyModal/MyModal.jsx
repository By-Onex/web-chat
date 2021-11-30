import React from 'react'
import style from './MyModal.module.css';

export default function MyModal({visibility, setVisibility, ...props}) {
    const rootClass = [style.modal];
    if(visibility)
        rootClass.push(style.active);
    return (
        <div className={rootClass.join(' ')}>
            <div className={style.modal_window}>
                {props.children}
            </div>
        </div>
    )
}
