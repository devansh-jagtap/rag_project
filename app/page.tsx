'use client';

import { useState } from "react";

export default function Home() {
  const [file ,setFile] = useState<File | null >(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleClick = async ()=>{

    if(!file) return;
    const formData = new FormData();

    formData.append('pdf',file);

    const response = await fetch('/api/upload' ,{
      method:"POST",
      body:formData,
    });
    console.log("Status:", response.status);

const text = await response.text();

console.log(text);
console.log(response);
//      if (!file) return;

//   const arrayBuffer = await file.arrayBuffer();
  
//   console.log(arrayBuffer);
//   console.log(arrayBuffer.byteLength);
//   const uint8 = new Uint8Array(arrayBuffer);
// console.log(uint8.slice(0, 20));
  //   console.log("selected file name is : " , file?.name)
  //   console.log(file);

  // console.log("Name:", file?.name);
  // console.log("Size:", file?.size);
  // console.log("Type:", file?.type);
  }

  return (
   <div>
    <h1>Enter the file</h1>
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange}/>
      <button onClick={handleClick}>
        upload
      </button>
    </div>
   </div>
  );
}
