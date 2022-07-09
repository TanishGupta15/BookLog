/* eslint-disable */
const email = document.querySelector('#email');

let user = {};

function getUserProfile() {
  const options = {
    method: 'GET',
    redirect: 'follow',
    credentials: 'include',
  };
  fetch('https://localhost:3001/user/profile', options)
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          user = data;
          email.innerHTML += data.email;
          successful();
        });
      } else if (response.status == 401) {
        failed('It seems your session has expired. Redirecting to login page...');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        failed('Welcome! Please register. Redirecting to registration page...');
        setTimeout(() => {
          window.location.href = 'register.html';
        }, 2000);
      }
    })
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });
}

function failed(text) {
  const feedback = document.querySelector('#OverallFeedback');
  feedback.style = 'background-color:rgba(255, 0, 0, 0.4); text-align:center;';
  feedback.innerHTML = text;
}
function successful() {
  const feedback = document.querySelector('#OverallFeedback');
  console.log('Success');
  // submitButton.style = "left : 30vw; opacity:0%;";
  // emailfield.style = "opacity : 0%";
  feedback.innerHTML = 'Welcome to BookLog!';
  feedback.style = "background-color:rgba(255,255,255,0.2);text-align:center;font-family:'Playfair Display'";
}

getUserProfile();
