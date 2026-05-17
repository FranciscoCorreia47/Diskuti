const params = new URLSearchParams(window.location.search);
const quiz_id = params.get("id");

fetch(`../backend/entire-quizzes.php?quiz-id=${quiz_id}`)
.then(response => response.json())
.then(data => {
    const questions_section = document.querySelector(".questions-section");
    const quiz_name = document.querySelector("#quiz-name");
    quiz_name.textContent = `${data["user"]} - ${data["name"]}`;

    let i = 1;

    for(question of Object.values(data.questions)){
        const question_div = document.createElement("div");
        const option_div = document.createElement("div");
        const question_text = document.createElement("h1");
        question_text.textContent = `${i}. ${question["text"]}`;
        question_text.classList.add("question");

        let question_type = "";
        let correct_options = 0
        for(option of question["options"]){
            if(option["correct"] == 1)
                correct_options += 1;
        }

        if(correct_options > 1)
            question_type = "checkbox";
        else
            question_type = "radio";
        
        if(question_type == "checkbox"){
            for(option of Object.values(question.options)){
                const label = document.createElement("label");
                const option_type = document.createElement("input");
                
                option_type.type = "checkbox";
                option_type.name = `question${i}`;
                option_type.classList.add("option");
                label.appendChild(option_type)
                label.appendChild(document.createTextNode(option["text"]));

                option_div.appendChild(label);
            }
        }
        else if(question_type == "radio"){
            for(option of Object.values(question.options)){
                const label = document.createElement("label");
                const option_type = document.createElement("input");
                
                option_text.type = "radio";
                option_text.name = `question${i}`;
                option_text.classList.add("option");
                label.appendChild(option_type)
                label.appendChild(document.createTextNode(option["text"]))
                
                option_div.appendChild(label);
            }
        }

        option_div.classList.add("option-div");
        question_div.classList.add("question-div");
        question_div.appendChild(question_text);
        question_div.appendChild(option_div);
        questions_section.appendChild(question_div);

        i += 1;
    }
})