const languagesUrl = "http://localhost:3000/languages"
const videosUrl = "http://localhost:3000/videos"
const commentsUrl = "http://localhost:3000/comments"

// usernames saved when a person enters the website
let username

// contains page header (logo, navbar)
let mainHeader = document.getElementById('header-container')   

// firstChild is replaced with new information based on action
let mainBody = document.getElementById('body-container')

// nav-bar of all the languages placed in mainHeader
let langDiv = document.createElement("div")
langDiv.id = "nav-bar"

// first mainBody message seen when entering the site
let welcomeDiv = document.createElement("div")
    welcomeDiv.id = 'welcome-container'
    welcomeDiv.innerHTML = `
    <h3 id='wel-message'>CodeHub</h3>
    <h4 class="slogan">Fifteen minutes could teach you fifteen percent or more.</h4>
    <p class='block-text'> 
    We at CodeHub envision a world where anyone and everyone can learn to code by increasing the accessibility to coding tutorials. We empower our users to advance their careers, further their knowledge, and change the world. We believe education can unlock your potential and help you become your best self.
    </p>
    `