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


// Validation of the account creation data 
const submit = document.querySelector("#send-btn");
const first_name = document.querySelector("#first-name");
const last_name = document.querySelector("#last-name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

submit.addEventListener("click", function(){
    //User name validation
    if(first_name.value.length > 20){
        const error_message = document.querySelector("#name-error")
        error_message.textContent = "First and Last name must contain a maximum of 20 characters";
        error_message.style.display = "block";
        first_name.style.border = "1px solid red";

        return;
    }
    else if(last_name.value.length > 20){
        const error_message = document.querySelector("#name-error")
        error_message.textContent = "First and Last name must contain a maximum of 20 characters";
        error_message.style.display = "block";
        last_name.style.border = "1px solid red";

        return;
    }

    //Email validation
    const email_regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    
    if(!(email_regex.test(email.value))){
        const error_message = document.querySelector("#email-error")
        error_message.textContent = "Please insert a valid email";
        error_message.style.display = "block";
        email.style.border = "1px solid red";

        return;
    }

    //Password validation
    const u_case = /[A-Z]/
    const l_case = /[a-z]/
    const digit = /[0-9]/
    const special_chars = /[-/\\^$*+?#@.()|[\]{}]/

    if(password.value.length < 8){
        const error_message = document.querySelector("#password-error")
        error_message.textContent = "The password must contain at least 8 characters";
        error_message.style.display = "block";
        password.style.border = "1px solid red";

        return;
    }

    else if(!u_case.test(password.value)){
        const error_message = document.querySelector("#password-error")
        error_message.textContent = "The password must contain at least 1 upper character";
        error_message.style.display = "block";
        password.style.border = "1px solid red";

        return;
    }

    else if(!l_case.test(password.value)){
        const error_message = document.querySelector("#password-error")
        error_message.textContent = "The password must contain at least 1 lower character";
        error_message.style.display = "block";
        password.style.border = "1px solid red";

        return;
    }

    else if(!digit.test(password.value)){
        const error_message = document.querySelector("#password-error")
        error_message.textContent = "The password must contain at least 1 digit";
        error_message.style.display = "block";
        password.style.border = "1px solid red";

        return;
    }

    else if(!special_chars.test(password.value)){
        const error_message = document.querySelector("#password-error")
        error_message.textContent = "The password must contain at least 1 special character";
        error_message.style.display = "block";
        password.style.border = "1px solid red";

        return;
    }

    fetch("account-creation.php", {
        method: "POST",
        body: new FormData(document.querySelector("#account-form"))
    })

    first_name.value = "";
    last_name.value = "";
    email.value = "";
    password.value = "";
})