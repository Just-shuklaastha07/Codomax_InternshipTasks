const form = document.getElementById("blogForm");

if(form){

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function(event){

        event.preventDefault();

        if(title.value.trim()==="" ||
           author.value.trim()==="" ||
           content.value.trim()==="")
        {
            message.innerHTML="Please fill in all the fields.";
            message.style.color="red";
        }
        else{
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
        }

    });

}

const blogContainer = document.getElementById("blogContainer");

async function loadBlogs() {

    console.log("Loading blogs...");

    try {

        const response = await fetch("http://localhost:3000/blogs");
        console.log("Response:", response);

        const blogs = await response.json();
        console.log("Blogs:", blogs);

        blogContainer.innerHTML = "";

        if (blogs.length === 0) {
            blogContainer.innerHTML = "<p>No blogs available.</p>";
            return;
        }

        blogs.forEach(blog => {

            const card = document.createElement("div");
            card.className = "blog-card";

            card.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            `;

            blogContainer.appendChild(card);

        });

    } catch (error) {
        console.error("Error:", error);
    }
}

if (blogContainer) {
    loadBlogs();
}