import React, { useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function UploadSection() {
  /** Upload/Import section for images/videos.
   * This scaffolding handles basic file selection and shows placeholders.
   * Future: integrate actual parsing/preview and upload to backend.
   */
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedImage(file ? file.name : null);
  };
  const onVideoChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedVideo(file ? file.name : null);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Import Media</div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Image</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload PNG, JPG. Max 50MB.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                >
                  Choose Image
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
                {selectedImage && (
                  <span className="text-sm text-gray-600">Selected: {selectedImage}</span>
                )}
              </div>
            </div>
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Video</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload MP4, AVI, MOV. Max 500MB.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90"
                >
                  Choose Video
                </button>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={onVideoChange}
                  className="hidden"
                />
                {selectedVideo && (
                  <span className="text-sm text-gray-600">Selected: {selectedVideo}</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Upload & Analyze
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Preview</div>
        <div className="card-body">
          <div className="h-64 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            No preview available yet
          </div>
        </div>
      </div>
    </div>
  );
}
