const menu_items = document.querySelectorAll(".side-menu>li");
const side_bar = document.querySelector(".side-bar");
const preview_area = document.querySelector(".preview-area");

const data = localStorage.getItem("quiz-name");
let quiz_name = new Object;

if (data){
  quiz_name = JSON.parse(data);

  const header_title = document.querySelector(".top-menu>li>h1");
  header_title.textContent = quiz_name.name;
}

for (let i of menu_items){
  i.addEventListener("mouseover", function (){
    side_bar.classList.toggle("expand");
  });
}

for (let i of menu_items){
  i.addEventListener("mouseout", function (){
    side_bar.classList.toggle("expand");
  });
}

const text_button = document.querySelector("#text");
const checkbox_button = document.querySelector("#checkbox");
const radio_button = document.querySelector("#radio");
const section_button = document.querySelector("#section");

text_button.addEventListener("click", function(){
  const txt_div = document.createElement("div");
  txt_div.classList.add("text-div");
  
  const txt_input = document.createElement("textarea");
  txt_input.classList.add("text-input");
  txt_input.placeholder = "Write your text";

  txt_div.appendChild(txt_input);

  preview_area.appendChild(txt_div);
});

let option_num = 0;

radio_button.addEventListener("click", function(){
  const question_div = document.createElement("div");
  question_div.classList.add("question-div");
  question_div.classList.add("radio");
  question_div.id = `${option_num}`;
  option_num++;
  
  const question = document.createElement("input");
  question.type = "text";
  question.placeholder = "Question...";
  question.classList.add("question-text");
  
  const options_div = document.createElement("div");
  options_div.classList.add("options-div");

  const curr_option = document.createElement("div");
  curr_option.classList.add("radio-option");
  
  const option_text = document.createElement("input");
  option_text.classList.add("option-text");
  option_text.placeholder = "Option...";
  option_text.addEventListener("dblclick", function(){
    curr_option.classList.toggle("correct");
  });

  const type_img = document.createElement("img");
  type_img.src = "./resources/radio.png";

  const bundle = document.createElement("div");
  bundle.classList.add("bundle");
  bundle.appendChild(type_img);
  bundle.appendChild(option_text);

  curr_option.appendChild(bundle);

  const add_option_button = document.createElement("button");
  add_option_button.classList.add("add-option");
  add_option_button.textContent = "+";

  options_div.appendChild(curr_option);
  
  question_div.appendChild(question);
  question_div.appendChild(options_div);
  question_div.appendChild(add_option_button);

  preview_area.appendChild(question_div);

  add_option_button.addEventListener("click", function(){
    const new_option = document.createElement("div");
    new_option.classList.add("radio-option");
    
    const option_text = document.createElement("input");
    option_text.classList.add("option-text");
    option_text.placeholder = "Option...";
    option_text.addEventListener("dblclick", function(){
      new_option.classList.toggle("correct");
    });

    const type_img = document.createElement("img");
    type_img.src = "./resources/radio.png";

    const bundle = document.createElement("div");
    bundle.classList.add("bundle");
    bundle.appendChild(type_img);
    bundle.appendChild(option_text);

    const trash = document.createElement("img");
    trash.src = "./resources/trashbin.png";
    trash.classList.add("trash");
    trash.addEventListener("click", function(){
      new_option.removeChild(bundle);
      new_option.remove(this);
    });

    new_option.appendChild(bundle);
    new_option.appendChild(trash);

    options_div.appendChild(new_option);
  });
});

checkbox_button.addEventListener("click", function(){
  const question_div = document.createElement("div");
  question_div.classList.add("question-div");
  question_div.classList.add("checkbox");
  question_div.id = `${option_num}`;
  option_num++;
  
  const question = document.createElement("input");
  question.type = "text";
  question.placeholder = "Question...";
  question.classList.add("question-text");
  
  const options_div = document.createElement("div");
  options_div.classList.add("options-div");

  const curr_option = document.createElement("div");
  curr_option.classList.add("checkbox-option");

  const option_text = document.createElement("input");
  option_text.classList.add("option-text");
  option_text.placeholder = "Option...";
  option_text.addEventListener("dblclick", function(){
    curr_option.classList.toggle("correct");
  });

  const type_img = document.createElement("img");
  type_img.src = "./resources/checkbox.png";
  
  const bundle = document.createElement("div");
  bundle.classList.add("bundle");
  bundle.appendChild(type_img);
  bundle.appendChild(option_text);

  curr_option.appendChild(bundle);

  const add_option_button = document.createElement("button");
  add_option_button.classList.add("add-option");
  add_option_button.textContent = "+";

  options_div.appendChild(curr_option);
  
  question_div.appendChild(question);
  question_div.appendChild(options_div);
  question_div.appendChild(add_option_button);

  preview_area.appendChild(question_div);

  add_option_button.addEventListener("click", function(){
    const new_option = document.createElement("div");
    new_option.classList.add("checkbox-option");
    
    const option_text = document.createElement("input");
    option_text.classList.add("option-text");
    option_text.placeholder = "Option...";
    option_text.addEventListener("dblclick", function(){
      new_option.classList.toggle("correct");
    });

    const type_img = document.createElement("img");
    type_img.src = "./resources/checkbox.png";

    const bundle = document.createElement("div");
    bundle.classList.add("bundle");
    bundle.appendChild(type_img);
    bundle.appendChild(option_text);

    const trash = document.createElement("img");
    trash.src = "./resources/trashbin.png";
    trash.classList.add("trash");
    trash.addEventListener("click", function(){
      new_option.removeChild(bundle);
      new_option.remove(this);
    });

    new_option.appendChild(bundle);
    new_option.appendChild(trash);

    options_div.appendChild(new_option);
  });
});

/* 
 * 
 * IMAGE UPLOAD LOGIC
 * 
 */

const input = document.getElementById('imageInput');
const preview = document.querySelector('.preview');

let image = null;

input.addEventListener('change', () => {
  const file = input.files[0];
  if (!file) return;
  image = file;

  const url = URL.createObjectURL(file);
  preview.style.backgroundImage = `url(${url})`;
  const quiz_name = document.querySelector(".preview-area>h1");
});

/*
 * 
 *  END OF IMAGE UPLOAD LOGIC
 *  
 */

const publish_button = document.querySelector(".publish");

publish_button.addEventListener("click", function(){
  const quiz_questions = document.querySelectorAll(".question-div");

  let current_question_num = 0;
  let quiz_json = {
      "name": quiz_name.name, 
      "questions": new Array,
  };

  for (let question of quiz_questions){
    let question_type = "";

    if (question.classList.contains("radio")) question_type = "radio";
    else if (question.classList.contains("checkbox")) question_type = "checkbox";
    else throw new Error("Typeless questions are not allowed");

    quiz_json.questions.push({
      "prompt": question.querySelector(".question-text").value,
      "type": question_type,
      "options": new Array,
    });
    current_question_num++;

    const question_options = question.querySelector(".options-div");

    for (let q of question_options.querySelectorAll("input")){
      quiz_json.questions[quiz_json.questions.length - 1].options.push({
        "text": q.value,
        "correct": q.classList.contains("correct") ? 1 : 0,
      });
    }
  }

  async function publish_quiz() {
    try {
      const formData = new FormData();
      const imageIn = document.querySelector("#imageInput");
      const image = imageIn.files[0];
      formData.append('banner', image);
      formData.append('data', JSON.stringify(quiz_json));

      fetch('../backend/quiz-publish.php', {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if (!res.ok)
          throw new Error(`Backend gave status ${res.status }`)
        return res.json();
      })
      .then(data => console.log(data));

    } catch (error) {
      console.error("Network or parsing error:", error);
    }
  }

  let cookies = document.cookie.split(";"); // Gets cookies and splits them per cookie
                                            // Each cookie is composed of cookiename=value; cookiename2=value2; etc.
  cookies.forEach(c =>{
    let pair = c.split("="); // Makes the pair being [0]=cookiename && [1]=value
    if (pair[0].trim() == 'usremail'){
      quiz_json.owner = decodeURIComponent(pair[1]);
    }
  });
  
  publish_quiz();
  
});