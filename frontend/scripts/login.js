// Button to toggle the "password" input type from password to text and vice versa
const toggle_eye = document.querySelector("#toggle-eye");

toggle_eye.addEventListener("click", function(){
    const password_input = document.querySelector("#password");
    const type = password_input.type;

    if (type == "password"){
        password_input.type = "text";
        toggle_eye.classList.remove("fa-eye");
        toggle_eye.classList.add("fa-eye-slash");
    }
    else {
        password_input.type = "password";
        toggle_eye.classList.remove("fa-eye-slash");
        toggle_eye.classList.add("fa-eye");
    }
})


// Validation of the login data 
const login_btn = document.querySelector("#login-btn")
const email = document.querySelector("#email");
const password = document.querySelector("#password");


login_btn.addEventListener("click", function(event){
    event.preventDefault();
    const emailtxt = email.value.trim();
    if(emailtxt != "" && password.value.trim() != ""){
        fetch("../backend/user-login.php", {
            method: "POST",
            body: new FormData(document.querySelector("#login-form"))
        })
        .then(response => response.text())
        .then(data => {
            console.log("Login response:", data);
            if(data.trim() === "ok"){
                localStorage.setItem('usremail', emailtxt)
                window.location.href = "/";
            }
            else{
                const body = document.querySelector("body");
                const login_error = document.createElement("div");
                const error_text = document.createElement("span");
                const error_symbol = document.createElement("span");

                login_error.classList.add("login-error");
                error_symbol.classList.add("fa-solid");
                error_symbol.classList.add("fa-triangle-exclamation");
                error_text.textContent = "Login failed. Please try again!";

                login_error.appendChild(error_symbol);
                login_error.appendChild(error_text);
                body.prepend(login_error);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    }
})

//Cleaning the errors when the user starts typing again
email.addEventListener("input", function(){
    const error_message = document.querySelector("#email-error");
    error_message.textContent = "";
    error_message.style.display = "none";
    email.style.borderColor = "";
});

password.addEventListener("input", function(){
    const error_message = document.querySelector("#password-error");
    error_message.textContent = "";
    error_message.style.display = "none";
    password.style.border = "";
});
