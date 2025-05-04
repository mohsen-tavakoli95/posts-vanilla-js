export function renderPosts(posts) {
  const container = document.getElementById("posts-container");

  if (!container) {
    console.error("Posts container not found!");
    return;
  }

  posts.forEach((post) => {
    const el = document.createElement("div");
    el.className = "post-card";
    el.innerHTML = `
      <div class="post-header">
        <h3>${post.title}</h3>
        <p class="post-views">Views: ${post.views}</p>
      </div>
      <p>${post.body}</p>
      <div class="reactions-container">
        <p><strong>Reactions:</strong></p>
        <p>👍 <strong>${post.reactions.likes || 0}</strong></p>,
        <p> 👎 <strong>${post.reactions.dislikes || 0}</strong></p>
      </div>
      <strong>Comments:</strong>
      ${
        post.comments.length > 0
          ? `
        <ul>
          ${post.comments
            .map(
              (c) => `<li><strong>${c.user.username}:</strong> ${c.body}</li>`
            )
            .join("")}
        </ul>
      `
          : `<p class="co-comments">No comments available.</p>`
      }
    `;
    container.appendChild(el);
  });
}
