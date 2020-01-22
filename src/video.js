// function called when nav-bar language clicked
// fetches and renders a list if all videos of that language
function getVideos(id, videoUl) {
    fetch(videosUrl).then(resp => resp.json())
    .then(result => result.map(video => {
        if (video.language.id === id) {
            listVideos(video, videoUl)
        }
    }))
}

// function that defines how to render a video as a list
// require video object and Ul too append list item to 
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

    titleH3.className = "list-titles"
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

// function is called when a video is selected
// fetches and renders a video show page based on id of video
function getSingleVideo(id, videoDiv) {
    fetch(`${videosUrl}/` + id).then(resp => resp.json())
    .then(video => showVideo(video, videoDiv))
}

// function that defines how to render the video show page
function showVideo(video, videoDiv) {
    let titleH2 = document.createElement('h2')
    let videoI = document.createElement('iframe')
    let pubH3 = document.createElement('h3')
    let descP = document.createElement('p')
    let commUl = document.createElement('ul')

    video.comments.forEach(comment => {
        // function to render comments
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
