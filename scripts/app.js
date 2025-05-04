import { getTopPostsWithDetails } from "./services/api.js";
import { renderPosts } from "./ui/render.js";
import { debounce } from "./utils/helpers.js";

async function loadInput() {
  const res = await fetch("../components/input.html");
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const header = document.getElementById("header");
  header.appendChild(wrapper.firstElementChild);
}

async function fetchAndRenderPosts(count) {
  if (!count || isNaN(count) || count < 1 || count > 100) return;

  try {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    const posts = await getTopPostsWithDetails(Number(count));
    renderPosts(posts);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }
}

(async function app() {
  await loadInput();

  const debouncedFetch = debounce((e) => {
    const value = e.target.value;
    fetchAndRenderPosts(value);
  }, 500);

  const input = document.getElementById("input");
  input.addEventListener("input", debouncedFetch);
})();
