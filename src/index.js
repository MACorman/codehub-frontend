document.addEventListener('DOMContentLoaded', function(){
    const languagesUrl = "http://localhost:3000/languages"
    const videosUrl = "http://localhost:3000/videos"
    const commentsUrl = "http://localhost:3000/comments"

    let mainHeader = document.getElementById('header-container')
    let mainBody = document.getElementById('body-container')
    

    getLanguage()

    function getLanguage(){
        fetch(languagesUrl).then(resp => resp.json())
        .then(result => result.map(language => createLanguage(language)))

    }

    function createLanguage(language){
        let langSpan = document.createElement('span')
        langSpan.id = language.name
        langSpan.dataset.id = language.id
        langSpan.innerText = `     ${language.name}     `
        mainHeader.appendChild(langSpan)

        langSpan.addEventListener('click', function(e){
            let videoUl = document.createElement('ul')
            mainBody.replaceChild(videoUl, mainBody.firstChild)
            let id = parseInt(e.target.dataset.id)
            // while (videoUl.hasChildNodes()) {  
            //     videoUl.removeChild(videoUl.firstChild);
            // }
            getVideos(id, videoUl)
              


        })
    }

    function getVideos(id, videoUl) {
        fetch(videosUrl).then(resp => resp.json())
        .then(result => result.map(video => {
            // console.log(video)
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
            let commentLi = document.createElement('li')
            commentLi.innerText = `${comment.username}: ${comment.content}`
            commUl.appendChild(commentLi)
        })

        titleH2.innerText = video.title

        videoI.src = `https://www.youtube.com/embed/${video.key}?autoplay=1` 
        videoI.width = '650'
        videoI.height = '480'

        pubH3.innerText = video.publisher
        descP.innerText = video.description

        videoDiv.appendChild(titleH2)
        videoDiv.appendChild(videoI)
        videoDiv.appendChild(pubH3)
        videoDiv.appendChild(descP)
        videoDiv.appendChild(commUl)

    }





























})