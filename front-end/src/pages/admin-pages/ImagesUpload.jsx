
import React, { useEffect } from "react";
import { useState } from "react";

export default function ImagesUpload({ onImagesSelect }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
  
    //Create preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previewUrls);

    onImagesSelect(files);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div>
      <div className="p-5 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Chọn các ảnh</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-sm"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
