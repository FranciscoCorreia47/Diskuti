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
