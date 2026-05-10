fetch("../backend/get-quizzes.php")
.then(response => response.json())
.then(data => {
    const quizzes_list = document.querySelector(".quizzes-list");
    const search_box = document.querySelector(".search-box"); 
    const search_input = document.querySelector("#search-bar");
    const search_btn = document.querySelector("#search-btn");

    search_box.addEventListener("click", function(event){
        if(event.target.classList.contains("fa-magnifying-glass")){
            event.target.remove();
            const clear_btn = document.createElement("span");
            clear_btn.classList.add("fa-solid");
            clear_btn.classList.add("fa-x");
            clear_btn.classList.add("search-btn");
            search_box.appendChild(clear_btn);

            if(search_input.value.trim() == ""){
                return;
            }

            while (quizzes_list.firstChild) {
                quizzes_list.removeChild(quizzes_list.lastChild);
            }

            for(quiz of data){
                if(quiz["name"].includes(search_input.value.trim())){
                    const name = quiz["name"];
                    const creation_date = quiz["creation_date"];
                    const banner = quiz["banner"];
                    const user_full_name = quiz["user_full_name"];

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
            }   
        }
        
        else if(event.target.classList.contains("fa-x")){
            search_input.value = "";
            event.target.remove()
            const new_search_btn = document.createElement("span");
            new_search_btn.classList.add("fa-solid");
            new_search_btn.classList.add("fa-magnifying-glass");
            new_search_btn.classList.add("search-btn");
            new_search_btn.id = "search-btn";
            search_box.appendChild(new_search_btn);

            for(quiz of data){
                const name = quiz["name"];
                const creation_date = quiz["creation_date"];
                const banner = quiz["banner"];
                const user_full_name = quiz["user_full_name"];

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
        }
    })

    for(quiz of data){
        const name = quiz["name"];
        const creation_date = quiz["creation_date"];
        const banner = quiz["banner"];
        const user_full_name = quiz["user_full_name"];

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
