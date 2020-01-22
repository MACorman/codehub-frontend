document.addEventListener('DOMContentLoaded', function(){

    // invoking the fetch of languages and rendering
    getLanguage()

    // invoke creation of username form
    usernameForm()

    mainHeader.addEventListener('click', (e) => {
        if (e.target.id === 'logo') {
            mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
        }
    })

    mainHeader.addEventListener("click", (e) => {
        if (e.target.id === "logout") {
            username = window.prompt("Enter Username")
            if (username === "") {
                username = window.prompt("Please enter a valid username")
            } else if (username === " "){ 
                username = window.prompt("Please enter a valid username")
            } else {
                mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
            }
        }
        else if (e.target.id === "submit-video") {
            submitVidForm()
        }
    })
})

// module.exports = {
//     createLanguage: createLanguage
// }

