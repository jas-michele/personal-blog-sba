let posts = [];
let title = document.getElementById('title');
let message = document.getElementById('message');
let form = document.getElementById('post-form');




function createPost(e) {
    e.preventDefault();

    const blog = {
        Id: crypto.randomUUID(),
        Title: title.value,
        Message: message.value,
        TimeStamp: new Date().getTime()
    }
    
    let isValid = true;

    if (blog.Title === "") {
        title.setCustomValidity("Please enter a title");
        title.reportValidity();
        isValid = false;
    }else{
        title.setCustomValidity = "";
    }

    if (blog.Message === "") {
        message.setCustomValidity("Please enter a message");
        message.reportValidity();
        isValid = false;
    }

    if(isValid) {
        posts.push(blog);

        localStorage.setItem('blog', JSON.stringify(posts));

        form.reset();
        
    }
    
}
