"use client";
import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DatasetUploader({ onData }: { onData: (data: any[]) => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        let data;
        if (file.name.endsWith(".csv")) {
          // Simple CSV to JSON
          const [header, ...rows] = text.trim().split(/\r?\n/);
          const keys = header.split(",");
          data = rows.map(row => {
            const values = row.split(",");
            return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
          });
        } else if (file.name.endsWith(".json")) {
          data = JSON.parse(text);
        } else {
          setError("Only CSV or JSON files are supported.");
          return;
        }
        onData(data);
      } catch (err) {
        setError("Failed to parse file. Please check your data format.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <Card className="p-6 flex flex-col gap-4 items-center justify-center w-full max-w-xl mx-auto mt-8">
      <h2 className="font-bold text-lg mb-2">Upload Your Dataset</h2>
      <input
        ref={fileInput}
        type="file"
        accept=".csv,.json"
        className="hidden"
        onChange={handleFile}
      />
      <Button onClick={() => fileInput.current?.click()} variant="outline">
        {filename ? `Change File (${filename})` : "Select CSV or JSON File"}
      </Button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="text-xs text-muted-foreground">We support CSV and JSON files. Your data is processed locally and never leaves your browser.</div>
    </Card>
  );
}
