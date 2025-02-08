"use client";

import { useState } from "react";

export default function About() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">About AI Video Transformer</h1>
      <p className="mb-8">
        AI Video Transformer is a cutting-edge tool that allows you to apply advanced AI-powered transformations to your
        videos. Using state-of-the-art machine learning models, we can enhance, stylize, and modify your videos in ways
        previously unimaginable.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {[
          {
            id: "item-1",
            question: "What types of video transformations are available?",
            answer:
              "We offer a variety of transformations including style transfer, video enhancement, object removal, and more. The specific options are available on the transformation page.",
          },
          {
            id: "item-2",
            question: "How long does the transformation process take?",
            answer:
              "The processing time depends on the length of your video and the type of transformation. Most transformations are completed within a few minutes to an hour.",
          },
          {
            id: "item-3",
            question: "What video formats are supported?",
            answer:
              "We support most common video formats including MP4, MOV, and AVI. The maximum file size is 500MB.",
          },
          {
            id: "item-4",
            question: "Is my data secure?",
            answer:
              "Yes, we take data security seriously. All uploaded videos are processed securely and are not shared with any third parties. We delete source videos after processing is complete.",
          },
        ].map((item) => (
          <div key={item.id} className="border border-gray-300 rounded-lg">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200 rounded-t-lg"
            >
              {item.question}
            </button>
            {openItem === item.id && (
              <div className="p-4 bg-white border-t">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
