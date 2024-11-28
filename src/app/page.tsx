"use client";
import Head from "next/head";
import { useState } from "react";
import { classifyImage } from "./modules/imageProcessing";
import { parsePredictions } from "./modules/parse";
// import Data from "./data"

import "./globals.css";

export default function Home() {
  const [predictions, setPredictions] = useState<string | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const handleAnalyzeClick = async () => {
    // Get the file input element and assert its type
    const fileInput = document.getElementById("image-upload") as HTMLInputElement;
  
    // Ensure the file input exists and has files
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setPredictions("Please upload a receipt");
      return;
    }

    setPredictions("Analyzing image...");

    const imageFile = fileInput.files[0];

    try {
      const predictions = await classifyImage(imageFile);
      setScanned(true);
      setPredictions(predictions.content); // Assume `setPredictions` updates state
    } catch (error) {
      setScanned(false);
      setPredictions(null);
      console.error("Error analyzing the receipt:", error);
    }
  };

  const handleSaveClick = async () => {
    if(!scanned || !predictions){
      setPredictions("Please analyze a receipt");
      return;
    }
    
    try {
      const result = await parsePredictions(predictions);
      alert(result.content); // Assume `setPredictions` updates state
      setPredictions("Receipt saved!")
      setScanned(false);
    } catch (error) {
      setPredictions("Error saving the receipt.");
      console.error("Error saving the receipt:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Receipt Tracker</title>
      </Head>
      <main className="main">
        <h1 className="title">AI-powered Receipt Scanner</h1>
        <p className="description">
          Next.js • OpenAI API • PostgreSQL
        </p>
        <div id="input-area">
        <label
          htmlFor="image-upload"
          className="button" >
          Upload Image
        </label>
          <input type="file" className="hidden" id="image-upload" onChange={() => setPredictions("File uploaded")}/>
          <button className="button" onClick={handleAnalyzeClick}>
              Analyze Receipt
          </button>
        </div>
        <div className="output-area">
        {predictions ? (
          <pre>{predictions}</pre>  // Display the predictions if it's not null
        ) : (
          <p>You can upload a receipt! Accepted formats: jpeg, png</p>  // Message when no predictions
        )}
      </div>
      <button className="button" onClick={handleSaveClick}>
            Save Entry
      </button>

      </main>
    </div> )
}