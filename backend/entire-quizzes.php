<?php
    include "config.php";

    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $quiz_id = $_POST["quiz-id"];

        $sql = $connection->prepare("SELECT name, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name, (SELECT text, (SELECT text, correct FROM options WHERE options.question_id = quetions.id) FROM questions WHERE questions.quiz_id = quizzes.id) FROM quizzes WHERE id = ?;");
        
        $sql->bind_param("s", $quiz_id);
        $sql->execute();
        $result = $sql->get_result();

        echo json_encode($result);
    }
?>