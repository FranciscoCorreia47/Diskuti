fetch("../backend/get-quizzes.php")
.then(response => response.json())
.then(data => {
    console.log(data);
    for(quiz of data){
        const name = quiz["name"];
        const creation_date = quiz["creation_date"];
        const banner = quiz["banner"];
        const user_full_name = quiz["user_full_name"];

        const quizzes_list = document.querySelector(".quizzes-list");
        const quiz_box = document.createElement("div");
        const quiz_item = document.createElement("div");
        const name_span = document.createElement("span");
        const quiz_details = document.createElement("span");

        quiz_item.style.backgroundImage = `url(${banner})`;
        name_span.textContent = name;
        quiz_details.textContent = `${user_full_name} • ${creation_date}`;

        quiz_box.classList.add("quiz-box");
        quiz_item.classList.add("quiz");
        name_span.classList.add("name-span");
        quiz_details.classList.add("quiz-details");

        quiz_box.appendChild(quiz_item);
        quiz_box.appendChild(name_span);
        quiz_box.appendChild(quiz_details);

        quizzes_list.appendChild(quiz_box);
    }
})
