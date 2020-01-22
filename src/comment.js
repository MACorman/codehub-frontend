// function to render comments in the video show page
// called by renderVideo function
function renderComment(comment, commUl) {
    let commentLi = document.createElement('li')
        commentLi.dataset.id = comment.id
        commentLi.innerHTML = `
        <h3 class='comment-author'>${comment.username}</h3> 
        <span class='comment-content'>${comment.content}</span>
        `
        commentLi.className = 'comments'
        commUl.appendChild(commentLi)

        // if statement to allow only the user who wrote comment be able to delete comment
        if (username === comment.username) {
           let deleteBtn = document.createElement("button")
           deleteBtn.className = "delete-btn"
           deleteBtn.innerText = "Delete"
           commentLi.appendChild(deleteBtn)
        }

        let hr = document.createElement("hr")
        hr.className = "comment-hr"
        commentLi.appendChild(hr)
        
        // event listener on delete comment button
        commentLi.addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                let commentId = parseInt(e.target.parentNode.dataset.id)
                deleteComment(commentLi, commentId)
            }
        })
}

// function to render a comment form to create a new comment
function commentForm(commUl) {
    let commForm = document.createElement("form")
    commForm.innerHTML = `
        <textarea class='autoExpand' cols="150" rows="3" name="content" placeholder="Add a Comment"></textarea>
        <input id='comment-button' type="submit" value='Create Comment'>
    `
    commForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let videoId = e.target.parentNode.dataset.id
        let commContent = e.target.content.value
        postComment(username, commContent, videoId, commUl)
        e.target.reset()
    })

    return commForm
}

// function to make a post request to database for comments
function postComment(username, commContent, id, commUl) {
    fetch(commentsUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({username: username, content: commContent, video_id: id})
    })
    .then(resp => resp.json())
    .then(comment => {
        renderComment(comment, commUl)

    })
}

// function to delete video from api
function deleteComment(commentLi, commentId) {
    fetch(`${commentsUrl}/${commentId}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        commentLi.remove() 
    })
}
