document.addEventListener('DOMContentLoaded', function(){
    const languagesUrl = "http://localhost:3000/languages"
    const videosUrl = "http://localhost:3000/videos"
    const commentsUrl = "http://localhost:3000/comments"
    let username

    let mainHeader = document.getElementById('header-container')   
    let mainBody = document.getElementById('body-container')

    getLanguage()

    let langDiv = document.createElement("div")
    langDiv.id = "nav-bar"
    

    let welcomeDiv = document.createElement("div")
    welcomeDiv.id = 'welcome-container'
    welcomeDiv.innerHTML = `
        <h3 id='wel-message'>CodeHub</h3>
        <h4 class="slogan">Fifteen minutes could teach you fifteen percent or more.</h4>
        <p class='block-text'> 
            His having within saw become ask passed misery giving. Recommend questions get too fulfilled. He fact in we case miss sake. Entrance be throwing he do blessing up. Hearts warmth in genius do garden advice mr it garret. Collected preserved are middleton dependent residence but him how. Handsome weddings yet mrs you has carriage packages. Preferred joy agreement put continual elsewhere delivered now. Mrs exercise felicity had men speaking met. Rich deal mrs part led pure will but. 
        </p>
    `
    

    
    function usernameForm() {
        let userForm = document.createElement("form")
        userForm.innerHTML = `
        <input type="text" name="username" placeholder="Username">
        <input type="submit" value="Enter Website"> 
        `
        mainHeader.appendChild(userForm)

        userForm.addEventListener("submit", (e) => {
            e.preventDefault()
            username = e.target.username.value
            // debugger
            
            mainHeader.innerHTML = `
            <img id='background' src="src/backg2.jpeg" alt="">
            <img id='logo' height="13%" width="13%" src="src/logo-1.png" alt="">
            <span id='submit-video'>Submit Video</span>
            <span id='break'> | </span>
            <span id='logout'>Logout</span>
            <hr>
            `

            mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
            mainHeader.appendChild(langDiv)
            
                        
        })
    }
    usernameForm()
    // debugger


    mainHeader.addEventListener('click', (e) => {
        if (e.target.id === 'logo') {
            mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
        }

    })


    function getLanguage(){
        fetch(languagesUrl).then(resp => resp.json())
        .then(result => result.map(language => createLanguage(language)))

    }

    function createLanguage(language){
        let langSpan = document.createElement('span')
        langSpan.id = language.name
        langSpan.dataset.id = language.id
        langSpan.innerText = `${language.name}`
        langDiv.appendChild(langSpan)

        langSpan.addEventListener('click', function(e){
            let videoUl = document.createElement('ul')
            mainBody.replaceChild(videoUl, mainBody.firstChild)
            let id = parseInt(e.target.dataset.id)
            getVideos(id, videoUl)
              


        })
    }

    function getVideos(id, videoUl) {
        fetch(videosUrl).then(resp => resp.json())
        .then(result => result.map(video => {
            if (video.language.id === id) {
                listVideos(video, videoUl)
            }
        }))
    }

    function listVideos(video, videoUl) {
        let videoLi = document.createElement('li')
        let titleH3 = document.createElement('h3')
        let pubH4 = document.createElement('h4')
        let descP = document.createElement('p')
        titleH3.innerText = video.title
        pubH4.innerText = `Publisher: ${video.publisher}`
        descP.innerText = video.description

        videoLi.appendChild(titleH3)
        videoLi.appendChild(pubH4)
        videoLi.appendChild(descP)

        titleH3.dataset.id = video.id 

        videoUl.appendChild(videoLi)

        titleH3.addEventListener('click', function(e){
            let videoDiv = document.createElement('div')
            videoDiv.dataset.id = e.target.dataset.id
            mainBody.replaceChild(videoDiv, mainBody.firstChild)
            let vidId = e.target.dataset.id
            getSingleVideo(vidId, videoDiv)

        })
    }


    function getSingleVideo(id, videoDiv) {
        fetch(`${videosUrl}/` + id).then(resp => resp.json())
        .then(video => showVideo(video, videoDiv))
    }

    function showVideo(video, videoDiv) {
        let titleH2 = document.createElement('h2')
        let videoI = document.createElement('iframe')
        let pubH3 = document.createElement('h3')
        let descP = document.createElement('p')
        let commUl = document.createElement('ul')

        video.comments.forEach(comment => {
            renderComment(comment, commUl)
        })

        titleH2.innerText = video.title
        titleH2.className = 'video-title'

        videoI.src = `https://www.youtube.com/embed/${video.key}?autoplay=1` 
        videoI.width = '650'
        videoI.height = '480'

        pubH3.innerText = video.publisher
        pubH3.className = 'video-pub'

        descP.innerText = video.description
        descP.className = 'video-desc'

        videoDiv.appendChild(titleH2)
        videoDiv.appendChild(videoI)
        videoDiv.appendChild(pubH3)
        videoDiv.appendChild(descP)
        videoDiv.appendChild(commentForm(commUl))
        videoDiv.appendChild(commUl)

    }

    function renderComment(comment, commUl) {
        let commentLi = document.createElement('li')
            commentLi.dataset.id = comment.id
            commentLi.innerHTML = `
            <h3 class='comment-author'>${comment.username}</h3> 
            <span class='comment-content'>${comment.content}</span>
            `
            commentLi.className = 'comments'
            commUl.appendChild(commentLi)

            if (username === comment.username) {
               let deleteBtn = document.createElement("button")
               deleteBtn.className = "delete-btn"
               deleteBtn.innerText = "Delete"
               commentLi.appendChild(deleteBtn)
               
            }
            let hr = document.createElement("hr")
            hr.className = "comment-hr"
            commentLi.appendChild(hr)
            

            commentLi.addEventListener("click", (e) => {
                if (e.target.className === "delete-btn") {
                    let commentId = parseInt(e.target.parentNode.dataset.id)
                    deleteComment(commentLi, commentId)
                }
            })
    }

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

    mainHeader.addEventListener("click", (e) => {
        if (e.target.id === "logout") {
            username = window.prompt("Enter Username")
            mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
        }
        else if (e.target.id === "submit-video") {
            submitVidForm()
        }
    })

    function deleteComment(commentLi, commentId) {
        fetch(`${commentsUrl}/${commentId}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            commentLi.remove() 
        })
    }

    function submitVidForm() {

        let formContainer = document.createElement("div")
        
        let submitMessage = document.createElement("h2")
        submitMessage.className = "new-video-header"
        submitMessage.innerText = "Submit New Video"

        let videoForm = document.createElement("form")

        let titleInput = document.createElement("input")
        titleInput.className = "video-form"
        titleInput.type = "text"
        titleInput.placeholder = "Title"
        titleInput.name = "title"


        let pubInput = document.createElement("input")
        pubInput.className = "video-form"
        pubInput.type = "text"
        pubInput.placeholder = "Publisher"
        pubInput.name = "publisher"

        let descInput = document.createElement("input")
        descInput.className = "video-form"
        descInput.type = "text"
        descInput.placeholder = "Description"
        descInput.name = "description"

        let keyInput = document.createElement("input")
        keyInput.className = "video-form"
        keyInput.type = "text"
        keyInput.placeholder = "Key"
        keyInput.name = "key"
        
        let langSelect = document.createElement("select")
        langSelect.className = "video-form"
        langSelect.name = "language"

        fetch(languagesUrl).then(resp => resp.json()).then(languages => {
            languages.map(language => {
                let langOption = document.createElement("option")
                langOption.value = language.id
                langOption.innerText = language.name
                langSelect.append(langOption)
            })
        })

        videoForm.append(titleInput)
        videoForm.append(pubInput)
        videoForm.append(descInput)
        videoForm.append(keyInput)
        videoForm.append(langSelect)
        
        let videoSubmit = document.createElement("input")
        videoSubmit.id = "video-submit-btn"
        videoSubmit.type = "submit"
        videoForm.append(videoSubmit)
        formContainer.append(submitMessage)  
        formContainer.append(videoForm)
        
        mainBody.replaceChild(formContainer, mainBody.firstChild)

        videoForm.addEventListener("submit", (e) => {
            e.preventDefault()
            let title = e.target.title.value
            let publisher = e.target.publisher.value
            let desc = e.target.description.value
            let key = e.target.key.value
            let language = parseInt(e.target.language.value)

            let newVideo = {title: title, publisher: publisher, description: desc, key: key, language_id: language}

            fetch(videosUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, 
                body: JSON.stringify(newVideo)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Video has been submitted.")
                mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
            })
        })
    }

    
    

   

    
























})