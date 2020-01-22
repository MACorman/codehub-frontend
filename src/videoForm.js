// invoked when click "submit video". Creates input form.
// Event listener on submit button to post new video to api
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
    
    // drop down in form to select which language video belongs to
    // fetch languages from api
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
    videoSubmit.value = "Submit Video"
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

        // post request to persist video to db
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