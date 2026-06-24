"use client";

import { useState } from "react";
import Questions from "./components/questions";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleClick = async () => {
    if (!file) return;
    const formData = new FormData();

    formData.append("pdf", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
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
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-zinc-950 text-white p-8">
      {/* Header Section */}
      <h1 className="text-5xl font-bold mb-8 text-center">Enter the file</h1>

      {/* Upload Control Box */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg mb-10 w-full max-w-xl">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-zinc-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-zinc-800 file:text-white
        hover:file:bg-zinc-700
        cursor-pointer"
        />
        <button
          onClick={handleClick}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Upload
        </button>
      </div>

      {/* Questions Section */}
      <div className="w-full max-w-xl flex flex-col items-center">
        <Questions />
      </div>
    </div>
  );
}
