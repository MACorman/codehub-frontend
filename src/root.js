// function to render a username input at root/ appends form to main header
function usernameForm() {
    let userForm = document.createElement("form")
    userForm.innerHTML = `
    <input type="text" name="username" placeholder="Username" required>
    <input type="submit" value="Enter Website"> 
    `
    mainHeader.appendChild(userForm)

    // on submission replaces current mainheader and mainbody with logo/navbar and welcomeDiv
    userForm.addEventListener("submit", (e) => {
        e.preventDefault()
        if (e.target.username.value != " ") {
            // console.log(e.target.username.value) 
            username = e.target.username.value
            
            mainHeader.innerHTML = `
            <img id='background' src="src/backg2.jpeg" alt="">
            <img id='logo' height="13%" width="13%" src="src/logo-1.png" alt="">
            <span id='submit-video'>Submit Video</span>
            <span id='break'> | </span>
            <span id='logout'>Change User</span>
            <hr>
            `

            mainBody.replaceChild(welcomeDiv, mainBody.firstChild)
            mainHeader.appendChild(langDiv)
        }              
    })
}
