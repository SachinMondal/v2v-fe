"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function VideoTransform() {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoUrl, setVideoUrlState] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [syncMode, setSyncMode] = useState("");
  const [lipSyncModel, setLipSyncModel] = useState("");
  const [transformedUrl, setTransformedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transformLoading, setTransformLoading] = useState(false);
  const uploadcareWidgetRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !uploadcareWidgetRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js";
      script.async = true;

      script.onload = () => {
        uploadcareWidgetRef.current = uploadcare.Widget("#uploadcare-widget");

        uploadcareWidgetRef.current.onChange((file) => {
          if (file) {
            file.done((info) => {
              console.log("Uploadcare Response:", info);
              setVideoFile(info);
            });
          } else {
            setVideoFile(null);
          }
        });
      };

      document.body.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, []);

  const uploadToCloudinary = async (file, type) => {
    if (!file) return console.error("Upload a file first!");

    setLoading(type == "audio" ? false : true);
    try {
      const formData = new FormData();

      if (file.cdnUrl) {
        const response = await fetch(file.cdnUrl);
        const blob = await response.blob();
        formData.append("video", blob, file.name || `uploadcare_${type}`);
      } else {
        formData.append("video", file);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (type == "audio") {
        setAudioUrl(res.data.video);
      } else {
        setVideoUrlState(res.data.video);
      }
      return res.data.video;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (videoFile) {
      uploadToCloudinary(videoFile, "video");
    }
  }, [videoFile]);
  
  const handleTransform = async () => {
    if (!videoUrl) return toast.error("Upload a video first!");
    setTransformLoading(true);
    let uploadedAudioUrl = audioUrl;
    if (audioFile) {
      uploadedAudioUrl = await uploadToCloudinary(audioFile, "audio");
      setAudioUrl(uploadedAudioUrl);
    }
    
    console.log(uploadedAudioUrl);
    const parameters = { audio_url: uploadedAudioUrl };

    if (syncMode) parameters.sync_mode = syncMode;
    if (lipSyncModel) parameters.model = lipSyncModel;
    const transformData = {
      videoUrl,
      parameters,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/transform`,
        transformData
      );

      setTransformedUrl(res.data.data.video.url);

      const webhookBody = {
        sourceVideoUrl: videoUrl,
        transformedVideoUrl: res.data.data.video.url,
      };

      const webhook = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/webhook`,
        webhookBody
      );
      setTransformLoading(false);
    } catch (error) {
      setTransformLoading(false);
      console.error("Transformation error:", error);
    }
  };

  const handleDownload = async () => {
    try {
      // Fetch the file as a Blob
      const response = await fetch(transformedUrl);
      const blob = await response.blob();
  
      
      const blobUrl = URL.createObjectURL(blob);
  
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "transformed_video.mp4"; 
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap bg-black-500 p-4">
        {/* Left Side */}
        <div className="flex flex-col justify-center p-4 w-full md:w-2/3">
          <div className="flex flex-col md:flex-row items-start md:items-center pb-2">
            <label className="mb-2 md:mb-0 md:mr-9">
              Select the video file:
            </label>
            <input
              type="hidden"
              id="uploadcare-widget"
              role="uploadcare-uploader"
              data-public-key={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
              data-tabs="file"
              data-clearable
              data-multiple="false"
            />
          </div>
          <button
            onClick={() => uploadToCloudinary(videoFile, "video")}
            className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto cursor:pointer"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload to Cloudinary"}
          </button>

          <hr className="mt-4" />
          <h1 className="text-lg font-semibold">Transformation Parameters</h1>

          <div className="mt-2">
            <label className="mb-2 mr-4">Video File:</label>
            <input
              type="text"
              value={videoUrl}
              readOnly
              className="p-2 border border-gray-300 rounded w-full max-w-md text-black"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 mr-4">Audio File:</label>
            <input
              className="w-full max-w-md text-black"
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4 justify-around">
            <div>
              <label className="mr-4">Sync Mode:</label>
              <select
                className="bg-white text-black rounded-md p-2 w-full md:w-auto"
                value={syncMode}
                onChange={(e) => setSyncMode(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="cut_off">Cut Off</option>
                <option value="loop">Loop</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>
            <div>
              <label className="mr-4">LipSync Model:</label>
              <select
                className="bg-white text-black rounded-md p-2 w-full md:w-auto"
                value={lipSyncModel}
                onChange={(e) => setLipSyncModel(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="lipsync-1.8.0">LipSync 1</option>
                <option value="lipsync-1.7.1">LipSync 2</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleTransform}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto cursor:pointer"
            disabled={transformLoading}
          >
            {transformLoading ? "Transforming Video..." : "Transform Video"}
          </button>
        </div>

        {/* Right Side (Video Preview) */}
        <div className="flex flex-col items-center justify-center p-4 w-full md:w-1/3">
          <div className=" w-full flex items-center justify-center h-64">
            {transformedUrl
              ? transformedUrl && (
                  <video
                    className="w-3/4 max-w-md h-[100%]"
                    src={transformedUrl}
                    controls
                  />
                )
              : videoUrl && (
                  <video
                    className="w-3/4 max-w-md h-[100%]"
                    src={videoUrl}
                    controls
                  />
                )}
          </div>
          <div className="mt-2">Preview</div>
          {transformedUrl && (
           <button
           onClick={handleDownload}
           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
         >
           Download Transformed Video
         </button>
          )}
        </div>
      </div>
    </>
  );
}
