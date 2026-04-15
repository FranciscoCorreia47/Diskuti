const menu_items = document.querySelectorAll(".side-menu>li");
const side_bar = document.querySelector(".side-bar");
const preview_area = document.querySelector(".preview-area");

const data = localStorage.getItem("quiz-name");

if (data){
  const quiz_name = JSON.parse(data);
  
  const title = document.querySelector(".preview-area>.quiz-name>h1");
  title.textContent = quiz_name.name;

  const header_title = document.querySelector(".top-menu>li>h1");
  header_title.textContent = quiz_name.name;
  
  localStorage.removeItem("quiz-name");
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

radio_button.addEventListener("click", function(){
  const question_div = document.createElement("div");
  question_div.classList.add("question-div");
  
  const question = document.createElement("input");
  question.type = "text";
  question.placeholder = "Question...";
  question.classList.add("question-text");
  
  const options_div = document.createElement("div");
  options_div.classList.add("options-div");

  const curr_option = document.createElement("input");
  curr_option.classList.add("radio-option");
  curr_option.placeholder = "Option...";

  const add_option_button = document.createElement("button");
  add_option_button.classList.add("add-option");
  add_option_button.textContent = "+";

  options_div.appendChild(curr_option);
  options_div.appendChild(add_option_button);
  
  question_div.appendChild(question);
  question_div.appendChild(options_div);

  preview_area.appendChild(question_div);

  add_option_button.addEventListener("click", function(){
    const new_option = document.createElement("input");
    new_option.classList.add("radio-option");
    new_option.placeholder = "Option...";

    options_div.appendChild(new_option);  
  });
});

checkbox_button.addEventListener("click", function(){
  const question_div = document.createElement("div");
  question_div.classList.add("question-div");
  
  const question = document.createElement("input");
  question.type = "text";
  question.placeholder = "Question...";
  question.classList.add("question-text");
  
  const options_div = document.createElement("div");
  options_div.classList.add("options-div");

  const curr_option = document.createElement("input");
  curr_option.classList.add("checkbox-option");
  curr_option.placeholder = "Option...";

  const add_option_button = document.createElement("button");
  add_option_button.classList.add("add-option");
  add_option_button.textContent = "+";

  options_div.appendChild(curr_option);
  
  question_div.appendChild(question);
  question_div.appendChild(options_div);
  question_div.appendChild(add_option_button);

  preview_area.appendChild(question_div);

  add_option_button.addEventListener("click", function(){
    const new_option = document.createElement("input");
    new_option.classList.add("checkbox-option");
    new_option.placeholder = "Option...";

    options_div.appendChild(new_option);
  });
});