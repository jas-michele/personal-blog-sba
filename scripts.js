let posts = [];
let title = document.getElementById('title');
let message = document.getElementById('message');
let form = document.getElementById('post-form');
let blogPosts = document.getElementById('blogPosts');
let editingPostId = null;

window.addEventListener("load", () => {
    const savedPost = JSON.parse(localStorage.getItem('blog'));

    if (savedPost) {

        posts = savedPost;

    }

    renderPost();
})

form.addEventListener("submit", createPost);




function createPost(e) {
    e.preventDefault();

    let isValid = true;

    if (title.value === "") {
        title.setCustomValidity("Please enter a title");
        title.reportValidity();
        isValid = false;
    } else {
        title.setCustomValidity = "";
    }

    if (message.value === "") {
        message.setCustomValidity("Please enter a message");
        message.reportValidity();
        isValid = false;
    }

    if (!isValid) return;

    if (editingPostId) {
        const post = posts.find(p => p.Id === editingPostId)

        post.Title = title.value;
        post.Message = message.value;

        editingPostId = null;
    } else {

        const blog = {
            Id: crypto.randomUUID(),
            Title: title.value,
            Message: message.value,
            TimeStamp: new Date().getTime()
        };

        posts.push(blog);
    }

    localStorage.setItem('blog', JSON.stringify(posts));
    renderPost();
    form.reset();

}

function renderPost() {

    blogPosts.innerHTML = "";


    posts.forEach(post => {

        const listItem = document.createElement("li");

        const titleEl = document.createElement('h3');
        titleEl.textContent = post.Title;

        const messageEl = document.createElement('p');
        messageEl.textContent = post.Message;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editPost(post.Id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deletePost(post.Id));

        listItem.appendChild(titleEl);
        listItem.appendChild(messageEl);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        console.log(listItem)

        blogPosts.appendChild(listItem);

    })
}

function editPost(id) {
    const post = posts.find(p => p.Id === id);

    title.value = post.Title;
    message.value = post.Message;

    editingPostId = id;


}

function deletePost(id) {
    posts = posts.filter(p => p.Id !== id);

    localStorage.setItem('blog', JSON.stringify(posts));

    renderPost();

}


