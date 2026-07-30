// ===============================
// ADD BLOG
// ===============================

const form = document.getElementById("blogForm");

if (form) {

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Check empty fields
        if (
            title.value.trim() === "" ||
            author.value.trim() === "" ||
            content.value.trim() === ""
        ) {
            message.innerHTML = "Please fill in all the fields.";
            message.style.color = "red";
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/blogs", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title.value.trim(),
                    content: content.value.trim()
                })
            });

            // Check if server response is successful
            if (!response.ok) {
                throw new Error("Failed to add blog");
            }

            const data = await response.json();

            console.log("Blog added:", data);

            message.innerHTML = "Blog submitted successfully!";
            message.style.color = "green";

            form.reset();

            // Go back to Home page after 1 second
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (error) {

            console.error("Error:", error);

            message.innerHTML =
                "Unable to add blog. Please try again.";

            message.style.color = "red";
        }

    });

}


// ===============================
// VIEW BLOGS
// ===============================

const blogContainer = document.getElementById("blogContainer");

async function loadBlogs() {

    try {

        const response = await fetch("http://localhost:3000/blogs");

        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const blogs = await response.json();

        console.log("Blogs received:", blogs);

        blogContainer.innerHTML = "";

        if (blogs.length === 0) {

            blogContainer.innerHTML =
                "<p>No blogs available. Create your first blog!</p>";

            return;
        }

        blogs.forEach(blog => {

            const card = document.createElement("div");

            card.className = "blog-card";

            showBlogView(card, blog);

            blogContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error:", error);

        blogContainer.innerHTML =
            "<p>Unable to load blogs. Please make sure the server is running.</p>";
    }
}


// ===============================
// DISPLAY BLOG
// ===============================

function showBlogView(card, blog) {

    card.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.content}</p>

    <div class="blog-actions">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </div>
`;


    // ===============================
    // EDIT BUTTON
    // ===============================

    const editBtn = card.querySelector(".editBtn");

    editBtn.addEventListener("click", () => {

        showEditForm(card, blog);

    });


    // ===============================
    // DELETE BUTTON
    // ===============================

    const deleteBtn = card.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", async function () {

        const confirmDelete =
            confirm("Are you sure you want to delete this blog?");

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:3000/blogs/${blog.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete blog");
            }

            const data = await response.json();

            console.log("Delete response:", data);

            // Reload blogs
            loadBlogs();

        } catch (error) {

            console.error("Delete error:", error);

            alert(
                "Unable to delete blog. Please try again."
            );
        }

    });

}


// ===============================
// EDIT BLOG FORM
// ===============================

function showEditForm(card, blog) {

    card.innerHTML = `

        <h3>Edit Blog</h3>

        <input
            type="text"
            class="edit-title"
            value="${blog.title}"
            placeholder="Blog title"
        >

        <textarea
            class="edit-content"
            rows="5"
            placeholder="Blog content"
        >${blog.content}</textarea>

        <div class="edit-actions">

            <button class="saveBtn">
                Save
            </button>

            <button class="cancelBtn">
                Cancel
            </button>

        </div>
    `;


    const saveBtn = card.querySelector(".saveBtn");

    const cancelBtn = card.querySelector(".cancelBtn");


    // ===============================
    // SAVE EDIT
    // ===============================

    saveBtn.addEventListener("click", async function () {

        const newTitle =
            card.querySelector(".edit-title").value.trim();

        const newContent =
            card.querySelector(".edit-content").value.trim();


        if (newTitle === "" || newContent === "") {

            alert("Title and content cannot be empty.");

            return;
        }


        try {

            const response = await fetch(
                `http://localhost:3000/blogs/${blog.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: newTitle,
                        content: newContent
                    })
                }
            );


            if (!response.ok) {
                throw new Error("Failed to update blog");
            }


            const data = await response.json();

            console.log("Updated blog:", data);


            // Update local blog object
            blog.title = newTitle;
            blog.content = newContent;


            // Show updated blog
            showBlogView(card, blog);


        } catch (error) {

            console.error("Update error:", error);

            alert(
                "Unable to update blog. Please try again."
            );
        }

    });


    // ===============================
    // CANCEL EDIT
    // ===============================

    cancelBtn.addEventListener("click", function () {

        showBlogView(card, blog);

    });

}


// ===============================
// LOAD BLOGS WHEN HOME PAGE OPENS
// ===============================

if (blogContainer) {

    loadBlogs();

}