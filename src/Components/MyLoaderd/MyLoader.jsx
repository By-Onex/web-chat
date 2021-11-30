import React from 'react'
import style from './MyLoader.module.css'

export default function MyLoader() {
    return (
        <div className={style.loader_body}>
            <div className={style.circle}></div>
        </div>
    )
}
