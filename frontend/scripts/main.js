const create_quiz = document.querySelector(".create-quiz");
const overlay = document.querySelector(".overlay");
const new_quiz = document.querySelector(".new-quiz");
const quiz_input = document.querySelector(".new-quiz>input");
const proceed = document.querySelector(".new-quiz>button");

create_quiz.addEventListener("click", function(){
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", function(event){
  if (event.target == overlay)
    overlay.classList.toggle("show");
});

proceed.addEventListener("click", function(){
  const quiz_name = quiz_input.value.trim();

  localStorage.setItem("quiz-name", JSON.stringify({name: quiz_name}));
  window.location.href = "quiz-creation.php";
});