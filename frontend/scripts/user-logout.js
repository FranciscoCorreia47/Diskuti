const { useActionState } = require("react");

const account_btn = document.querySelector("#user-account");
const user_id = document.querySelector("#user-account").dataset.userId

account_btn.addEventListener("click", function(){
    const user_info_div = document.createElement("div");
    
    const formdata = new FormData();
    formdata.append("user-id", user_id);

    fetch("../backend/user-logout.php", {
        method: "POST",
        body: formdata
    })
    .then(response => response.text())
    .then(data => {
        const user_name = data["full_user_name"];
        const email = data["email"];

        const name_span = document.createElement("span");
        const email_span = document.createElement("span");
        const logout_button = document.createElement("button");

        name_span.textContent = user_name;
        email_span.textContent = email;

        name_span.classList.add("name-span");
        email_span.classList.add("email-span");
        logout_button.classList.add("logout-button");

        logout_button.addEventListener("click", function(){
            fetch("../backend/user-logout.php?logout=1")
        })
    })
})