"use client";
import React, { useState } from "react";

const ShareMessage = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("failed to copy text");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <p className="mb-2 whitespace-pre-wrap">{text}</p>
      <button
        onClick={copyToClipboard}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default ShareMessage;
