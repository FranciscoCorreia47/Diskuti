const account_btn = document.querySelector("#user-account");
const user_id = document.querySelector("#user-account").dataset.userId

account_btn.addEventListener("click", function(){
    const user_info_div = document.querySelector(".logout-div");
    
    const formdata = new FormData();
    formdata.append("user-id", user_id);

    fetch("../backend/user-logout.php", {
        method: "POST",
        body: formdata
    })
    .then(response => response.json())
    .then(data => {
        if (user_info_div.children.length > 0) {
            user_info_div.classList.toggle("show-div");
            return;
        }

        const user_name = data["user_full_name"];
        const email = data["email"];

        const name_span = document.createElement("span");
        const email_span = document.createElement("span");
        const logout_button = document.createElement("button");

        name_span.textContent = user_name;
        email_span.textContent = email;

        name_span.classList.add("logout-name-span");
        email_span.classList.add("email-span");
        logout_button.classList.add("logout-button");
        logout_button.textContent = "Log Out";

        const user_info = document.createElement("div");
        user_info.classList.add("user-info");
        user_info.appendChild(name_span);
        user_info.appendChild(email_span);

        const separator = document.createElement("div");
        separator.classList.add("separator-div");

        logout_button.addEventListener("click", function(){
            window.location.href = "../backend/user-logout.php?logout=1";
        })

        user_info_div.classList.toggle("show-div");

        user_info_div.appendChild(user_info)
        user_info_div.appendChild(separator)
        user_info_div.appendChild(logout_button);
        
    })
})