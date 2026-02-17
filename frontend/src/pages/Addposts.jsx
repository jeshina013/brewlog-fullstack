import { useState } from "react";

function AddPosts() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:5262/api/posts";



  function addPost() {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!author.trim()) {
      setError("Author is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setError("");

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, description, imageUrl })
    }).then(() => {
      setTitle("");
      setAuthor("");
      setDescription("");
      setImageUrl("");
    });
  }

  return (
    <div>
      <h2>Add New Post</h2>

      {error && (
        <p style={{ color: "#b71c1c", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={addPost}>Add</button>
    </div>
  );

}

export default AddPosts;
