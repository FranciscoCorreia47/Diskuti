const menu_items = document.querySelectorAll(".side-menu>li");
const side_bar = document.querySelector(".side-bar");

const data = localStorage.getItem("quiz-name");

if (data){
  const quiz_name = JSON.parse(data);
  console.log(quiz_name);
  const title = document.querySelector(".preview-area>.quiz-name>h1");
  title.textContent = quiz_name.name;
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