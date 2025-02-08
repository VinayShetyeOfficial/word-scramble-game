// src/components/FileUploadComponent.jsx

import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";

const FileUploadComponent = () => {
  const { uploadWords } = useGame();
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result.trim();
        console.log("Raw file content:", text);

        // Split the text into words
        const rawWords = text
          .split(/[,\s\n]+/)
          .map((word) => word.trim())
          .filter((word) => word.length > 0);

        console.log("Raw words:", rawWords);

        // Process into word objects
        const processedWords = rawWords
          .filter((word) => word.length >= 4 && word.length <= 10)
          .map((word) => ({
            original: word.toUpperCase(),
            scrambled: word
              .toUpperCase()
              .split("")
              .sort(() => Math.random() - 0.5)
              .join(""),
          }));

        console.log("Processed words:", processedWords);

        if (processedWords.length === 0) {
          setUploadStatus("No valid words found in file");
          return;
        }

        // Upload the processed words
        const success = uploadWords(processedWords);

        if (success) {
          setUploadStatus("Words uploaded successfully");
          // Verify the upload
          const savedWords = localStorage.getItem("userWords");
          console.log("Saved words:", savedWords);
        } else {
          setUploadStatus("Failed to upload words");
        }
      } catch (error) {
        console.error("Error processing file:", error);
        setUploadStatus("Error processing file");
      }
    };

    reader.onerror = () => {
      setUploadStatus("Error reading file");
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
      >
        Upload Word List
      </label>
      {uploadStatus && (
        <p
          className={`mt-2 ${
            uploadStatus.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default FileUploadComponent;
