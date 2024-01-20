"use client";

export default function VideoUpload() {
  return (
    <div>
      <form action="http://localhost:8000/api/v1/video" method="post" encType="multipart/form-data">
        <input type="file" name="videoFile" />
        <input type="file" name="thumbnailFile" />
        <input type="text" name="title" />
        <input type="text" name="description" />
        <input type="submit" />
      </form>
    </div>
  );
}
