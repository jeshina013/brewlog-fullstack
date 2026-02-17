import { useEffect, useState } from "react";

function Manage1() {
  const [posts, setPosts] = useState([]);
  const apiUrl = "http://localhost:5262/api/posts";
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setPosts(data));
  }

  function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this post?"))
      return;

    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    }).then(() => fetchPosts());
  }

  function updatePost(post) {
  const newTitle = prompt("New title:", post.title);
  if (newTitle === null) return;

  const newAuthor = prompt("New author:", post.author);
  if (newAuthor === null) return;

  const newDescription = prompt("New description:", post.description);
  if (newDescription === null) return;

  const newImageUrl = prompt("New image URL:", post.imageUrl || "");
  if (newImageUrl === null) return;

  if (!newTitle.trim() || !newAuthor.trim() || !newDescription.trim()) {
    alert("Title, Author, and Description cannot be empty.");
    return;
  }

  fetch(`${apiUrl}/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: post.id,
      title: newTitle,
      author: newAuthor,
      description: newDescription,
      imageUrl: newImageUrl
    })
  }).then(() => fetchPosts());
}


  return (
    <div>
      <h2>All Posts</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "40%" }}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts
            .filter(post =>
              post.title.toLowerCase().includes(search.toLowerCase())
            )
            .map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => updatePost(post)}>
                    Edit
                  </button>
                  <button onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}


export default Manage1;
