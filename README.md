# Top Posts Dashboard

A lightweight dashboard to view and explore top posts, built with **Vanilla JavaScript** and **CSS Grid**.

## 🚀 Features

- Fetches top posts from an API (`dummyjson.com`)
- Displays posts in a clean 3-column grid
- Shows:
  - Post title
  - Post body
  - Views
  - Likes 👍 and Dislikes 👎
  - Comments for each post
- Input field to dynamically select the number of posts (1–100)
- Debounced input handling for better performance

## 🛠 Tech Stack

- HTML5
- CSS3 (Grid Layout)
- Vanilla JavaScript (ES6+)

## 📦 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohsen-tavakoli95/posts-vanilla-js.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd posts-vanilla-js
   ```

3. **Install live-server (if you don't already have it):**

   ```bash
   npm install -g live-server
   ```

   > `live-server` is needed because the project fetches a local `input.html` file, and browsers block local `fetch()` without a server.

4. **Run live-server:**

   ```bash
   live-server
   ```

5. **Your browser should automatically open at:**

   ```
   http://127.0.0.1:8080/
   ```

✅ Now you can interact with the app and dynamically fetch posts!

---

## 📁 Project Structure

```
/components
    input.html            # Input field component
/scripts
    /core
        cache.js          # Cache requests
        fetcher.js        # Fetch utility with timeout and caching
        throttle.js       # Utility to throttle concurrent API requests
    /services
        api.js            # API request functions
    /ui
        render.js         # Renders posts to the DOM
    /utils
        helpers.js        # Reusable functions
    app.js                # Main app logic
/styles
    styles.css            # App styling
index.html                # Main HTML file
README.md                 # This documentation
```

---

## 🤝 Contributing

Pull requests, issues, and feature suggestions are welcome!  
Please open an issue first to discuss what you would like to change.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

# 🚀 Happy Coding!
