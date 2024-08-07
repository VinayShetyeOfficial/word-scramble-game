// src/components/FileUploadComponent.jsx

import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";

const FileUploadComponent = () => {
  const { uploadWords } = useGame();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const words = text.split(/\r?\n/).filter((word) => word.trim() !== "");
        uploadWords(words);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Words</button>
    </div>
  );
};

export default FileUploadComponent;
