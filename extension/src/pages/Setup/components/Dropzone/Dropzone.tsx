import React, { DragEvent } from "react";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import style from "./style.module.scss"
import { useDropzone } from "./useDropzone";



const Dropzone = () => {
    const {handleDragEnter, handleDragOver, handleDragLeave, handleDrop} = useDropzone()
   
    
    return(
        <div className={style.dropzone} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <span className={style.text}>Upuść plik konfiguracyjny, aby kontynuować</span>
        </div>
    )
}



export default Dropzone