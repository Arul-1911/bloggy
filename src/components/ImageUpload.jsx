"use client";

import { useState } from "react";
import { storage } from "../../static/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ImageUpload({ returnImage }) {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageAsFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bloggy_unasigned");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dccxetkpg/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImgUrl(data.secure_url);
      returnImage(data.secure_url);
      console.log("Uploaded to Cloudinary successfully");
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2 flex flex-col gap-2 w-full">
      <label htmlFor="coverImage">
        <span className="bg-gray-500/10 cursor-pointer  my-3 inline-block border-2 p-3 rounded border-dashed border-gray-200">
          {loading ? "Uploading image...." : "Uplaod Cover Image"}
        </span>
        <input
          id="coverImage"
          onChange={handleImageAsFile}
          type="file"
          hidden
          className="mb-2"
        />
      </label>

      {imgUrl && (
        <div>
          <p>Upload successfully </p>
          <img
            className="border border-gray-400 rounded-md"
            src={imgUrl}
            alt="upload image"
            style={{ width: "30%" }}
          />
        </div>
      )}
    </div>
  );
}
