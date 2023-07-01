import React, { useState } from "react";

const PreviewImage = ({ photo }) => {
    const [preview,seetPreview]=useState(null)
 
    const reader=new FileReader()
    reader.readAsDataURL(photo)
    reader.onload=()=>{
        seetPreview(reader.result)
    };
    return (
        <div>{preview?<img src={preview} alt="preview" width="250px" height="250px"/>:"loading..."}</div>
    )
};

export default PreviewImage;
