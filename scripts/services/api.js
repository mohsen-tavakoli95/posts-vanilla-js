// services/api.js
import { fetchWithTimeoutAndCache } from "../core/fetcher.js";
import { throttlePromises } from "../core/throttle.js";

const BASE_URL = "https://dummyjson.com";

const endpoints = {
  posts: () => `${BASE_URL}/posts`,
  postDetails: (id) => `${BASE_URL}/posts/${id}`,
  postComments: (id) => `${BASE_URL}/comments/post/${id}`,
};

export async function fetchAllPosts() {
  const { posts } = await fetchWithTimeoutAndCache(endpoints.posts());
  return posts;
}

export async function fetchPostDetails(postId) {
  return fetchWithTimeoutAndCache(endpoints.postDetails(postId));
}

export async function fetchPostComments(postId) {
  const { comments } = await fetchWithTimeoutAndCache(
    endpoints.postComments(postId)
  );
  return comments;
}

export async function getTopPostsWithDetails(limit = 5, concurrency = 3) {
  const allPosts = await fetchAllPosts();
  const topPosts = selectTopPostsByReactions(allPosts, limit);

  const postTasks = topPosts.map((post) => async () => {
    try {
      const [details, comments] = await Promise.all([
        fetchPostDetails(post.id),
        fetchPostComments(post.id),
      ]);
      return { ...details, comments };
    } catch (error) {
      console.error(`Failed to fetch data for post ID ${post.id}:`, error);
      return null;
    }
  });

  const results = await throttlePromises(concurrency, postTasks);
  return results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value);
}

function selectTopPostsByReactions(posts, limit) {
  return [...posts].sort((a, b) => b.reactions - a.reactions).slice(0, limit);
}
