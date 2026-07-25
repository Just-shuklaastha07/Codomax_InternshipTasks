const form = document.getElementById("blogForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");
const message = document.getElementById("message");

form.addEventListener("submit", function(event){

    event.preventDefault();

    if(title.value.trim()==="" ||
       author.value.trim()==="" ||
       content.value.trim()==="")
    {
        message.innerHTML="Please fill in all the fields.";
        message.style.color="red";
    }
    else{

        message.innerHTML="Blog submitted successfully!";
        message.style.color="green";

        form.reset();
    }

});