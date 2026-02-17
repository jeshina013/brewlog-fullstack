import { useEffect, useState } from "react";

function HomeTemp() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const apiUrl = "http://localhost:5262/api/posts";

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "25px" }}>Dashboard</h2>

      <div className="card-grid">
        {posts.map(post => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => setSelectedPost(post)}
            style={{ cursor: "pointer" }}
          >

            <h3>{post.title}</h3>
            <p className="author">By {post.author}</p>
            <p className="date">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedPost.title}</h2>
              <p><strong>Author:</strong> {selectedPost.author}</p>
              <p>{selectedPost.description}</p>

              {selectedPost.imageUrl && (
                <img
                  src={selectedPost.imageUrl}
                  alt="Post"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    marginTop: "15px",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5"
                  }}
                />

              )}

              <button
                onClick={() => setSelectedPost(null)}
                style={{ marginTop: "20px" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default HomeTemp;
