
const section = false;
// Modal functionality


document.getElementById("openLoginModalBtn").addEventListener("click", function() {
  document.getElementById("loginModal").style.display = "block";
  const section = true;
  if(section==true)
  {
    const display = document.getElementById('display');
    display.style.display= "none";

  }
  section=false;
  

});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
  document.getElementById("loginModal").style.display = "none";
 
});

window.addEventListener("click", function(event) {
  if (event.target == document.getElementById("loginModal")) {
    document.getElementById("loginModal").style.display = "none";
    const display = document.getElementById('display');
    display.style.display= "block";

  }
});

// Function to handle login
document.getElementById("login").addEventListener("click", function() {
  const email =  document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert(user.email + " Login successfully!!!");
    window.location.href = 'index.html'; // Redirect to index.html after successful login

    const hideLogin = document.getElementById('loginSection');
    hideLogin.style.display = 'none';

    const showLogout = document.getElementById('logoutSection');
    showLogout.style.display = 'block';

  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });                 
});


// Add an event listener to the loginSection to trigger the modal
// Function to display the logout modal

