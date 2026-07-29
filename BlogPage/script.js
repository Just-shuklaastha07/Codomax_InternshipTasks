const form = document.getElementById("blogForm");

if (form) {

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (
            title.value.trim() === "" ||
            author.value.trim() === "" ||
            content.value.trim() === ""
        ) {
            message.innerHTML = "Please fill in all the fields.";
            message.style.color = "red";
        } else {

            await fetch("http://localhost:3000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.value,
                    content: content.value
                })
            });

            message.innerHTML = "Blog submitted successfully!";
            message.style.color = "green";
            form.reset();

        }

    });

}

const blogContainer = document.getElementById("blogContainer");

async function loadBlogs() {

    try {

        const response = await fetch("http://localhost:3000/blogs");
        const blogs = await response.json();

        blogContainer.innerHTML = "";

        if (blogs.length === 0) {
            blogContainer.innerHTML = "<p>No blogs available.</p>";
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
    }

}

function showBlogView(card, blog) {

    card.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.content}</p>

    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
`;

const deleteBtn = card.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", async function () {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        loadBlogs();
    } else {
        alert("Failed to delete blog.");
    }

});
    const editBtn = card.querySelector(".editBtn");

    editBtn.addEventListener("click", () => {
        showEditForm(card, blog);
    });

}

function showEditForm(card, blog) {

    card.innerHTML = `
        <input type="text" class="edit-title" value="${blog.title}">

        <textarea class="edit-content" rows="5">${blog.content}</textarea>

        <div class="edit-actions">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    `;

    const saveBtn = card.querySelector(".saveBtn");
    const cancelBtn = card.querySelector(".cancelBtn");

    saveBtn.addEventListener("click", async () => {

        const newTitle = card.querySelector(".edit-title").value.trim();
        const newContent = card.querySelector(".edit-content").value.trim();

        if (newTitle === "" || newContent === "") {
            alert("Fields cannot be empty");
            return;
        }

        console.log(blog);
console.log(blog.id);
        const response = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent
            })
        });

        if (response.ok) {

            blog.title = newTitle;
            blog.content = newContent;

            showBlogView(card, blog);

        } else {
            alert("Failed to update blog.");
        }

    });

    cancelBtn.addEventListener("click", () => {
        showBlogView(card, blog);
    });

}

if (blogContainer) {
    loadBlogs();
}