import React, { useState } from "react";

const PreviewImage = ({ photo }) => {
    const [preview,seetPreview]=useState(null)
 
    const reader=new FileReader()
    reader.readAsDataURL(photo)
    reader.onload=()=>{
        seetPreview(reader.result)
    };
    return (
        <div>{preview?<img src={preview} alt="preview" width="100px" height="100px"/>:"loading..."}</div>
    )
};

export default PreviewImage;
