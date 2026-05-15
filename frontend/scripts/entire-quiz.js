const quiz_id = document.querySelector("#quiz").

fetch("../backend/entire-quizzes.php", {
    method: "GET",
    body: JSON.stringify({"quiz-id": quiz_id})
})
.then(response => response.json())
.then(data => {

})