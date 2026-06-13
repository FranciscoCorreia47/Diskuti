const params = new URLSearchParams(window.location.search);
const user_id = params.get("user-id");

fetch(`../backend/get-quizzes.php?user-id=${user_id}`)
.then(response => response.json())
.then(data => {
    const quizzes_list = document.querySelector(".quizzes-list");
    const search_box = document.querySelector(".search-box"); 
    const search_input = document.querySelector("#search-bar");
    const search_btn = document.querySelector("#search-btn");

    if(data.length == 1){
        quizzes_list.style.justifyContent = "flex-start";
    }
    else{
        quizzes_list.style.justifyContent = "space-evenly";
    }

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

            for(let quiz of Object.values(data)){
                if(quiz["name"].includes(search_input.value.trim())){
                    const id = quiz["id"];
                    const name = quiz["name"];
                    const creation_date = quiz["creation_date"];
                    const banner = quiz["banner"];
                    const user_full_name = quiz["user_name"];
                    const submit_count = quiz["submit_count"];
                    const comments_count = Object.values(quiz.comments).length;

                    const quiz_box = document.createElement("div");
                    const quiz_item = document.createElement("div");
                    const name_span = document.createElement("span");
                    const quiz_details = document.createElement("span");
                    const quiz_statistics = document.createElement("div");
                    const submit_span = document.createElement("span");
                    const comment_span = document.createElement("span");
                    const comment_icon = document.createElement("span");
                    comment_icon.classList.add("fa-comment");
                    comment_icon.classList.add("fa-regular");
                    const submission_icon = document.createElement("span");
                    submission_icon.classList.add("fa-arrow-up-from-bracket");
                    submission_icon.classList.add("fa-solid");
                    const submit_count_span = document.createElement("span");
                    const comments_count_span = document.createElement("span");

                    submit_count_span.textContent = `${submit_count}`;
                    comments_count_span.textContent = `${comments_count}`;

                    quiz_item.style.backgroundImage = `url(../backend/${banner})`;
                    name_span.textContent = name;
                    quiz_details.textContent = `${user_full_name} • ${creation_date}`;

                    quiz_box.classList.add("quiz-box");
                    quiz_item.classList.add("quiz");
                    name_span.classList.add("name-span");
                    quiz_details.classList.add("quiz-details");
                    quiz_statistics.classList.add("quiz-statistics");
                    submit_span.classList.add("submit-span");
                    comment_span.classList.add("comment-span");
                    
                    comment_icon.addEventListener("click", function(){
                        const comment_section = document.querySelector(".comment-section");
                        comment_section.classList.toggle("show-comments");
                        
                        const comment_div = document.querySelector(".comment-div");

                        const comment_body = document.querySelector(".comment-body");
                        while(comment_body.firstChild){
                            comment_body.removeChild(comment_body.firstChild);
                        }

                        const comment_header = document.querySelector(".comment-header");
                        while(comment_header.firstChild){
                            comment_header.removeChild(comment_header.firstChild);
                        }

                        const comment_header_name = document.createElement("span");
                        const comment_header_number = document.createElement("span");

                        comment_header_name.textContent = `${name} `;
                        comment_header_number.textContent = `• ${Object.values(quiz.comments).length} Comments`;
                        
                        comment_header_name.classList.add("comment-header-name");
                        comment_header_number.classList.add("comment-header-number");

                        comment_header.appendChild(comment_header_name);
                        comment_header.appendChild(comment_header_number);

                        comment_div.appendChild(comment_body);

                        let comments_displayed = 0;

                        for(let comm of Object.values(quiz.comments)){

                            const user_comment = document.createElement("div");
                            const comm_text = document.createElement("div");
                            const comment_details = document.createElement("div");
                            const user_span = document.createElement("span");
                            const date_span = document.createElement("span");

                            user_span.textContent = `${comm.user_name}`;
                            date_span.textContent = `${comm.creation_date}`;
                            comm_text.textContent = `${comm.text}`;

                            user_span.classList.add("comment-user-span");
                            date_span.classList.add("comment-date-span");
                            comment_details.appendChild(user_span);
                            comment_details.appendChild(date_span);
                            comment_details.classList.add("comment-details");

                            comm_text.classList.add("comment-text");

                            user_comment.appendChild(comment_details);
                            user_comment.appendChild(comm_text);
                            user_comment.classList.add("user-comment");
                            
                            comment_body.appendChild(user_comment);
                            comments_displayed += 1;

                            if(comments_displayed < Object.values(quiz.comments).length){
                                const comment_separator = document.createElement("div");
                                comment_separator.classList.add("comment-separator");
                                comment_body.appendChild(comment_separator);
                            }
                        }

                        if(comment_body.childElementCount == 0){
                            const search_img = document.createElement("img");
                            search_img.src = "resources/comment-img.svg";
                            search_img.classList.add("comment-img");

                            const no_results_text = document.createElement("span");
                            no_results_text.textContent = "There are no comments right now!"
                            no_results_text.classList.add("no-comments-text");

                            const no_results = document.createElement("div");
                            no_results.classList.add("no-comments");

                            no_results.appendChild(search_img);
                            no_results.appendChild(no_results_text);

                            comment_body.appendChild(no_results)
                        }

                    });

                    submit_span.appendChild(submission_icon);
                    submit_span.appendChild(submit_count_span);
                    comment_span.appendChild(comment_icon);
                    comment_span.appendChild(comments_count_span);

                    quiz_statistics.appendChild(submit_span);
                    quiz_statistics.appendChild(comment_span);

                    quiz_box.appendChild(quiz_item);
                    quiz_box.appendChild(name_span);
                    quiz_box.appendChild(quiz_details);
                    quiz_box.appendChild(quiz_statistics);

                    quizzes_list.appendChild(quiz_box);

                    if(quizzes_list.childElementCount === 1){
                        quizzes_list.style.justifyContent = "flex-start";
                    }
                    else{
                        quizzes_list.style.justifyContent = "space-evenly";
                    }
                }
            }
            
            if(quizzes_list.childElementCount == 0){
                const quiz_img = document.createElement("img");
                quiz_img.src = "resources/my-quizzes-img.svg";
                quiz_img.classList.add("my-quizzes-img");

                const no_quizzes_text = document.createElement("span");
                no_quizzes_text.textContent = "Your quizzes will apear here"
                no_quizzes_text.classList.add("no-quizzes-text");

                const no_quizzes = document.createElement("div");
                no_quizzes.classList.add("no-quizzes");

                no_quizzes.appendChild(quiz_img);
                no_quizzes.appendChild(no_quizzes_text);

                quizzes_list.appendChild(no_quizzes)
            }
        }
        
        else if(event.target.classList.contains("fa-x")){
            quizzes_list.style.justifyContent = "space-evenly";

            search_input.value = "";
            event.target.remove()
            const new_search_btn = document.createElement("span");
            new_search_btn.classList.add("fa-solid");
            new_search_btn.classList.add("fa-magnifying-glass");
            new_search_btn.classList.add("search-btn");
            new_search_btn.id = "search-btn";
            search_box.appendChild(new_search_btn);

            while (quizzes_list.firstChild) {
                quizzes_list.removeChild(quizzes_list.lastChild);
            }

            for(let quiz of Object.values(data)){
                const id = quiz["id"];
                const name = quiz["name"];
                const creation_date = quiz["creation_date"];
                const banner = quiz["banner"];
                const user_full_name = quiz["user_name"];
                const submit_count = quiz["submit_count"];
                const comments_count = Object.values(quiz.comments).length;

                const quiz_box = document.createElement("div");
                const quiz_item = document.createElement("div");
                const name_span = document.createElement("span");
                const quiz_details = document.createElement("span");
                const quiz_statistics = document.createElement("div");
                const submit_span = document.createElement("span");
                const comment_span = document.createElement("span");
                const comment_icon = document.createElement("span");
                comment_icon.classList.add("fa-comment");
                comment_icon.classList.add("fa-regular");
                const submission_icon = document.createElement("span");
                submission_icon.classList.add("fa-arrow-up-from-bracket");
                submission_icon.classList.add("fa-solid");
                const submit_count_span = document.createElement("span");
                const comments_count_span = document.createElement("span");

                submit_count_span.textContent = `${submit_count}`;
                comments_count_span.textContent = `${comments_count}`;

                quiz_item.style.backgroundImage = `url(../backend/${banner})`;
                name_span.textContent = name;
                quiz_details.textContent = `${user_full_name} • ${creation_date}`;

                quiz_box.classList.add("quiz-box");
                quiz_item.classList.add("quiz");
                name_span.classList.add("name-span");
                quiz_details.classList.add("quiz-details");
                quiz_statistics.classList.add("quiz-statistics");
                submit_span.classList.add("submit-span");
                comment_span.classList.add("comment-span");
                
                comment_icon.addEventListener("click", function(){
                    const comment_section = document.querySelector(".comment-section");
                    comment_section.classList.toggle("show-comments");
                    
                    const comment_div = document.querySelector(".comment-div");

                    const comment_body = document.querySelector(".comment-body");
                    while(comment_body.firstChild){
                        comment_body.removeChild(comment_body.firstChild);
                    }
                    
                    const comment_header = document.querySelector(".comment-header");
                    while(comment_header.firstChild){
                        comment_header.removeChild(comment_header.firstChild);
                    }

                    const comment_header_name = document.createElement("span");
                    const comment_header_number = document.createElement("span");

                    comment_header_name.textContent = `${name} `;
                    comment_header_number.textContent = `• ${Object.values(quiz.comments).length} Comments`;
                    
                    comment_header_name.classList.add("comment-header-name");
                    comment_header_number.classList.add("comment-header-number");

                    comment_header.appendChild(comment_header_name);
                    comment_header.appendChild(comment_header_number);

                    comment_div.appendChild(comment_body);
                    
                    let comments_displayed = 0;

                    for(let comm of Object.values(quiz.comments)){

                        const user_comment = document.createElement("div");
                        const comm_text = document.createElement("div");
                        const comment_details = document.createElement("div");
                        const user_span = document.createElement("span");
                        const date_span = document.createElement("span");

                        user_span.textContent = `${comm.user_name}`;
                        date_span.textContent = `${comm.creation_date}`;
                        comm_text.textContent = `${comm.text}`;

                        user_span.classList.add("comment-user-span");
                        date_span.classList.add("comment-date-span");
                        comment_details.appendChild(user_span);
                        comment_details.appendChild(date_span);
                        comment_details.classList.add("comment-details");

                        comm_text.classList.add("comment-text");

                        user_comment.appendChild(comment_details);
                        user_comment.appendChild(comm_text);
                        user_comment.classList.add("user-comment");
                        
                        comment_body.appendChild(user_comment);
                        comments_displayed += 1;

                        if(comments_displayed < Object.values(quiz.comments).length){
                            const comment_separator = document.createElement("div");
                            comment_separator.classList.add("comment-separator");
                            comment_body.appendChild(comment_separator);
                        }
                    }

                    if(comment_body.childElementCount == 0){
                        const search_img = document.createElement("img");
                        search_img.src = "resources/comment-img.svg";
                        search_img.classList.add("comment-img");

                        const no_results_text = document.createElement("span");
                        no_results_text.textContent = "There are no comments right now!"
                        no_results_text.classList.add("no-comments-text");

                        const no_results = document.createElement("div");
                        no_results.classList.add("no-comments");

                        no_results.appendChild(search_img);
                        no_results.appendChild(no_results_text);

                        comment_body.appendChild(no_results)
                    }

                });

                submit_span.appendChild(submission_icon);
                submit_span.appendChild(submit_count_span);
                comment_span.appendChild(comment_icon);
                comment_span.appendChild(comments_count_span);

                quiz_statistics.appendChild(submit_span);
                quiz_statistics.appendChild(comment_span);

                quiz_box.appendChild(quiz_item);
                quiz_box.appendChild(name_span);
                quiz_box.appendChild(quiz_details);
                quiz_box.appendChild(quiz_statistics);

                quizzes_list.appendChild(quiz_box);
            }
        }

        if(quizzes_list.childElementCount == 0){
            const quiz_img = document.createElement("img");
            quiz_img.src = "resources/my-quizzes-img.svg";
            quiz_img.classList.add("my-quizzes-img");

            const no_quizzes_text = document.createElement("span");
            no_quizzes_text.textContent = "Your quizzes will apear here"
            no_quizzes_text.classList.add("no-quizzes-text");

            const no_quizzes = document.createElement("div");
            no_quizzes.classList.add("no-quizzes");

            no_quizzes.appendChild(quiz_img);
            no_quizzes.appendChild(no_quizzes_text);

            quizzes_list.appendChild(no_quizzes)
        }
    })

    for(let quiz of Object.values(data)){
        const id = quiz["id"];
        const name = quiz["name"];
        const creation_date = quiz["creation_date"];
        const banner = quiz["banner"];
        const user_full_name = quiz["user_name"];
        const submit_count = quiz["submit_count"];
        const comments_count = Object.values(quiz.comments).length;

        const quiz_box = document.createElement("div");
        const quiz_item = document.createElement("div");
        const name_span = document.createElement("span");
        const quiz_details = document.createElement("span");
        const quiz_statistics = document.createElement("div");
        const submit_span = document.createElement("span");
        const comment_span = document.createElement("span");
        const comment_icon = document.createElement("span");
        comment_icon.classList.add("fa-comment");
        comment_icon.classList.add("fa-regular");
        const submission_icon = document.createElement("span");
        submission_icon.classList.add("fa-arrow-up-from-bracket");
        submission_icon.classList.add("fa-solid");
        const submit_count_span = document.createElement("span");
        const comments_count_span = document.createElement("span");

        submit_count_span.textContent = `${submit_count}`;
        comments_count_span.textContent = `${comments_count}`;

        quiz_item.style.backgroundImage = `url(../backend/${banner})`;
        name_span.textContent = name;
        quiz_details.textContent = `${user_full_name} • ${creation_date}`;

        quiz_box.classList.add("quiz-box");
        quiz_item.classList.add("quiz");
        name_span.classList.add("name-span");
        quiz_details.classList.add("quiz-details");
        quiz_statistics.classList.add("quiz-statistics");
        submit_span.classList.add("submit-span");
        comment_span.classList.add("comment-span");
        
        comment_icon.addEventListener("click", function(){
            const comment_section = document.querySelector(".comment-section");
            comment_section.classList.toggle("show-comments");
            
            const comment_div = document.querySelector(".comment-div");

            const comment_body = document.querySelector(".comment-body");
            while(comment_body.firstChild){
                comment_body.removeChild(comment_body.firstChild);
            }

            const comment_header = document.querySelector(".comment-header");
            while(comment_header.firstChild){
                comment_header.removeChild(comment_header.firstChild);
            }

            
            const comment_header_name = document.createElement("span");
            const comment_header_number = document.createElement("span");

            comment_header_name.textContent = `${name} `;
            comment_header_number.textContent = `• ${Object.values(quiz.comments).length} Comments`;
            
            comment_header_name.classList.add("comment-header-name");
            comment_header_number.classList.add("comment-header-number");

            comment_header.appendChild(comment_header_name);
            comment_header.appendChild(comment_header_number);

            comment_div.appendChild(comment_body);
            
            let comments_displayed = 0;

            for(let comm of Object.values(quiz.comments)){

                const user_comment = document.createElement("div");
                const comm_text = document.createElement("div");
                const comment_details = document.createElement("div");
                const user_span = document.createElement("span");
                const date_span = document.createElement("span");

                user_span.textContent = `${comm.user_name}`;
                date_span.textContent = `${comm.creation_date}`;
                comm_text.textContent = `${comm.text}`;

                user_span.classList.add("comment-user-span");
                date_span.classList.add("comment-date-span");
                comment_details.appendChild(user_span);
                comment_details.appendChild(date_span);
                comment_details.classList.add("comment-details");

                comm_text.classList.add("comment-text");

                user_comment.appendChild(comment_details);
                user_comment.appendChild(comm_text);
                user_comment.classList.add("user-comment");
                
                comment_body.appendChild(user_comment);
                comments_displayed += 1;

                if(comments_displayed < Object.values(quiz.comments).length){
                    const comment_separator = document.createElement("div");
                    comment_separator.classList.add("comment-separator");
                    comment_body.appendChild(comment_separator);
                }
            }

            if(comment_body.childElementCount == 0){
                const search_img = document.createElement("img");
                search_img.src = "resources/comment-img.svg";
                search_img.classList.add("comment-img");

                const no_results_text = document.createElement("span");
                no_results_text.textContent = "There are no comments right now!"
                no_results_text.classList.add("no-comments-text");

                const no_results = document.createElement("div");
                no_results.classList.add("no-comments");

                no_results.appendChild(search_img);
                no_results.appendChild(no_results_text);

                comment_body.appendChild(no_results)
            }

        });

        submit_span.appendChild(submission_icon);
        submit_span.appendChild(submit_count_span);
        comment_span.appendChild(comment_icon);
        comment_span.appendChild(comments_count_span);

        quiz_statistics.appendChild(submit_span);
        quiz_statistics.appendChild(comment_span);

        quiz_box.appendChild(quiz_item);
        quiz_box.appendChild(name_span);
        quiz_box.appendChild(quiz_details);
        quiz_box.appendChild(quiz_statistics);

        quizzes_list.appendChild(quiz_box);
    }

    if(quizzes_list.childElementCount == 0){
        const quiz_img = document.createElement("img");
        quiz_img.src = "resources/my-quizzes-img.svg";
        quiz_img.classList.add("my-quizzes-img");

        const no_quizzes_text = document.createElement("span");
        no_quizzes_text.textContent = "Your quizzes will apear here"
        no_quizzes_text.classList.add("no-quizzes-text");

        const no_quizzes = document.createElement("div");
        no_quizzes.classList.add("no-quizzes");

        no_quizzes.appendChild(quiz_img);
        no_quizzes.appendChild(no_quizzes_text);

        quizzes_list.appendChild(no_quizzes)
    }
})

const comment_section = document.querySelector(".comment-section");

comment_section.addEventListener("click", function(event) {
    if (event.target === comment_section) {
        comment_section.classList.remove("show-comments");
    }
});