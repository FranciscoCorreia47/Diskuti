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


login_btn.addEventListener("click", function(){
    console.log("botão clicado");
    console.log("email:", email.value);
    console.log("password:", password.value);
    if(email.value != "" && password.value != ""){
        fetch("../backend/user-login.php", {
            method: "POST",
            body: new FormData(document.querySelector("#login-form"))
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if(data === "ok"){
                window.location.href = "./index.php";
            }
            else{
                const form_area = document.querySelector(".area-form");
                const login_error = document.createElement("div");
                const error_text = document.createElement("span");
                const error_symbol = document.createElement("span");

                login_error.classList.add("login-error");
                error_symbol.classList.add("fa-solid");
                error_symbol.classList.add("fa-triangle-exclamation");
                error_text.textContent = "Login failed. Please try again!";

                login_error.appendChild(error_symbol);
                login_error.appendChild(error_text);
                form_area.prepend(login_error);
            }
        })

        email.value = "";
        password.value = "";
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
