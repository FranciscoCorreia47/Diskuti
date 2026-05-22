const params = new URLSearchParams(window.location.search);
const quiz_id = params.get("quiz-id");
const user_id = params.get("user-id");

fetch(`../backend/entire-quizzes.php?quiz-id=${quiz_id}`)
.then(response => response.json())
.then(data => {
    const questions_section = document.querySelector(".questions-section");
    const quiz_name = document.querySelector("#quiz-name");
    quiz_name.textContent = `${data["user_name"]} - ${data["name"]}`;

    let i = 1;

    for(question of Object.values(data.questions)){
        const questions_div = document.createElement("div");
        const options_div = document.createElement("div");
        const question_text = document.createElement("h1");
        question_text.textContent = `${i}. ${question["text"]}`;
        question_text.classList.add("question");

        if(question["type"] == "checkbox"){
            questions_div.setAttribute("qstn-type", "checkbox");
            for(option of Object.values(question.options)){
                const label = document.createElement("label");
                const option_type = document.createElement("input");
                
                option_type.type = "checkbox";
                option_type.name = `question${i}`;
                option_type.classList.add("option");
                option_type.setAttribute("correct", `${option["correct"]}`);
                label.appendChild(option_type);
                label.appendChild(document.createTextNode(option["text"]));

                options_div.appendChild(label);
            }
        }
        else if(question["type"] == "radio"){
            questions_div.setAttribute("qstn-type", "radio");
            for(option of Object.values(question.options)){
                const label = document.createElement("label");
                const option_type = document.createElement("input");
                
                option_type.type = "radio";
                option_type.name = `question${i}`;
                option_type.classList.add("option");
                option_type.setAttribute("correct", `${option["correct"]}`);
                label.appendChild(option_type);
                label.appendChild(document.createTextNode(option["text"]));
                
                options_div.appendChild(label);
            }
        }

        options_div.classList.add("options-div");
        questions_div.classList.add("questions-div");
        questions_div.appendChild(question_text);
        questions_div.appendChild(options_div);
        questions_section.appendChild(questions_div);

        i += 1;
    }

    const return_btn = document.querySelector("#return");
    const submit = document.querySelector("#submit");
    submit.addEventListener("click", function(){
        let result = 0;
        let quotation_per_qstn = 100/(Object.values(data.questions)).length;

        const qstns = document.querySelectorAll(".questions-div");
        for(qstn of qstns){
            if(qstn.getAttribute("qstn-type") == "checkbox"){
                let quotation_per_optn = quotation_per_qstn / qstn.querySelectorAll("label > input[correct = '1']").length;
                const optns = qstn.querySelectorAll("label");

                for(optn of optns){
                    const checkbox = optn.querySelector("input");

                    if(checkbox.getAttribute("correct") == 1 && checkbox.checked == true){
                        result += quotation_per_optn;
                        optn.style.backgroundColor = '#31e0b155';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }
                    
                    if(checkbox.getAttribute("correct") == 0 && checkbox.checked == false){
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }

                    if(checkbox.getAttribute("correct") == 1 && checkbox.checked == false){
                        optn.style.backgroundColor = '#31e0b155';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }

                    if(checkbox.getAttribute("correct") == 0 && checkbox.checked == true){
                        result -= quotation_per_optn;
                        optn.style.backgroundColor = '#ff9a9a';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }
                } 
            }

            if(qstn.getAttribute("qstn-type") == "radio"){
                const optns = qstn.querySelectorAll("label");

                for(optn of optns){
                    const checkbox = optn.querySelector("input");

                    if(checkbox.getAttribute("correct") == 1 && checkbox.checked == true){
                        result += quotation_per_qstn;
                        optn.style.backgroundColor = '#31e0b155';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }
                    
                    if(checkbox.getAttribute("correct") == 0 && checkbox.checked == false){
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }

                    if(checkbox.getAttribute("correct") == 1 && checkbox.checked == false){
                        optn.style.backgroundColor = '#31e0b155';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }

                    if(checkbox.getAttribute("correct") == 0 && checkbox.checked == true){
                        optn.style.backgroundColor = '#ff9a9a';
                        optn.style.pointerEvents = "none";
                        checkbox.disabled = true;
                    }
                } 
            }
        }

        questions_section.style.marginLeft = "15vw";
        questions_section.style.marginRight = "auto";

        const result_box = document.querySelector("#result-box");
        result_box.style.display = "flex";

        const result_intro = document.createElement("span");
        const grade_box = document.createElement("div");
        const final_grade = document.createElement("span");
        const total = document.createElement("span")
        const message_box = document.createElement("div");
        const final_message = document.createElement("span");
        
        result_intro.textContent = "Let's see your final result";
        if(result >= 0)
            final_grade.textContent = `${result}`;
        else
            final_grade.textContent = "0";

        total.textContent = "/100";

        if(result == 100)
            final_message.textContent = "Perfect score, outstanding!";
        else if(result >= 70)
            final_message.textContent = "Great job, well done!";
        else if(result >= 40)
            final_message.textContent = "Good effort, keep it up!";
        else
            final_message.textContent = "Better luck next time!";

        result_intro.classList.add("result-text");
        final_grade.classList.add("final-grade");
        total.classList.add("total-grade");
        final_message.classList.add("final-message");
        
        grade_box.appendChild(final_grade);
        grade_box.appendChild(total);
        grade_box.classList.add("grade-box");

        message_box.appendChild(final_message);
        message_box.classList.add("message-box");

        result_box.appendChild(result_intro);
        result_box.appendChild(grade_box);
        result_box.appendChild(message_box);

        const body = document.querySelector("body");
        body.appendChild(result_box);

        submit.disabled = true;

        const comment_box = document.querySelector("#comment-box");
        comment_box.style.display = "flex";

        const comment_message = document.createElement("span");
        comment_message.textContent = "Leave your comment";

        const input_div = document.createElement("div");
        const comment_input = document.createElement("input");
        const send_comment = document.createElement("span");

        comment_message.classList.add("comment-message");
        input_div.classList.add("input-div");
        input_div.id = "input-div";
        comment_input.classList.add("comment-input");
        comment_input.id = "comment-input";
        comment_input.maxLength = 1024;
        send_comment.classList.add("fa-regular");
        send_comment.classList.add("fa-paper-plane");
        send_comment.id = "comment-btn";
        
        input_div.appendChild(comment_input);
        input_div.appendChild(send_comment);

        comment_box.appendChild(comment_message);
        comment_box.appendChild(input_div);

        const comment_btn = document.querySelector("#comment-btn");
        comment_btn.addEventListener("click", function(){
            const comment_inp = document.querySelector("#comment-input");
            const comment_text = comment_inp.value;

            if(!(comment_text == "")){
                const separator = document.createElement("div");
                separator.classList.add("comment-separator");
                const comment_div = document.createElement("div");
                
                comment_div.textContent = comment_text;
                comment_div.classList.add("user-comment");

                comment_box.appendChild(separator);
                comment_box.appendChild(comment_div);
                comment_inp.disabled = true;
                comment_inp.value = "";

                const formdata = new FormData();
                formdata.append("user-comment", `${comment_text}`);
                formdata.append("user-id", `${user_id}`);
                formdata.append("quiz-id", `${quiz_id}`);

                fetch("../backend/entire-quizzes.php", {
                    method: "POST",
                    body: formdata
                });
            }
        })

        fetch(`../backend/entire-quizzes.php?quiz-id=${quiz_id}&submission=1`);
    })

    return_btn.addEventListener("click", function(){
        window.location.href = "./index.php";
    })
})