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

module.exports = {
    createLanguage: createLanguage
}
