import React from 'react'
import style from './MyModal.module.css';

export default function MyModal({ visibility, setVisibility, ...props }) {
    const rootClass = [style.modal];
    
    if (visibility)
        rootClass.push(style.active);

    return (
        <div className={rootClass.join(' ')} onClick={ () => setVisibility(false)}>
            <div className={style.modal_window} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}
