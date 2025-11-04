# [Penora 📝](https://penora-ui.onrender.com)– Modern Blog Application


**Penora** is a full-stack blog platform built using the **MERN stack (MongoDB, Express, React, Node.js)** and **Tailwind CSS**.
It offers a seamless blogging experience where users can create, edit, delete, and explore blogs, all within an elegant and responsive interface.

---

## 🌟 Detailed Information

Penora is designed for both writers and readers.
It provides a smooth workflow from creating a blog to publishing it for others to read.
The app uses **JWT authentication** for secure login and user management, **MongoDB** for storing posts and users, and **Multer** for handling image uploads.
The **React** frontend communicates with the **Express backend** using **Axios**, providing a fast and responsive UI.

---

## 🧠 How to Use the Application

Follow these steps to get started with **Penora**:

### 1️⃣ Open the Application

* Run both **frontend** and **backend** servers.
* Visit `http://localhost:5173` in your browser.

### 2️⃣ Register or Login

* Click on **Register** to create a new account using your name, email, and password.
* After successful registration, log in to access your dashboard.

### 3️⃣ Create a New Blog

* Click on the **Create Blog** button in the navigation bar.
* Fill out the form fields:

  * **Title:** Give your blog a meaningful title.
  * **Category:** Choose or type a category like “Technology”, “Travel”, or “Lifestyle”.
  * **Content:** Write your blog post in the text editor.
  * **Image (optional):** Upload a blog cover image using the upload field.
* Click **Submit** to publish your blog.

### 4️⃣ View and Manage Blogs

* Navigate to the **Home Page** to view all published blogs.
* Click on a blog title to read it in full view.
* As the author, you can **Edit** or **Delete** your own posts.

### 5️⃣ Logout Securely

* Click the **Logout** button in the navbar to end your session safely.

---

## 💡 Features

* 🔐 **User Authentication** – Register and log in securely using JWT.
* 📝 **Blog Management** – Create, edit, and delete blogs easily.
* 🖼️ **Image Uploads** – Add blog cover images with `FormData` + `Multer`.
* 🗂️ **Categorized Blogs** – Browse blogs by topic.
* 💻 **Responsive UI** – Built with Tailwind CSS for all screen sizes.
* ⚙️ **Protected Routes** – Only authenticated users can post or modify blogs.
* 🧾 **Error Handling** – User-friendly error alerts and validations.

---

## 🚀 Optional Enhancements

You can enhance **Penora** further by integrating:

* 🔔 **Real-Time Notifications** using Socket.io.
* ☁️ **Cloudinary Integration** for secure cloud image storage.
* 💬 **Comment System** for user interaction.
* 🧠 **Redis Caching** to improve speed and scalability.
* 🐳 **Docker Deployment** for easy containerization.
* 🧾 **Markdown Editor** for formatting blog content.
* 🌙 **Dark Mode** toggle for comfortable reading at night.

---

