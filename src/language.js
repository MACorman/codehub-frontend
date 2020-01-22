// function to fetch from api all languages and render languages
function getLanguage(){
    fetch(languagesUrl).then(resp => resp.json())
    .then(result => result.map(language => createLanguage(language)))

}

// function to create a span from language object with event listener on-click
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

// module.exports = {
//     createLanguage: createLanguage
// }
