<?php
    include "config.php";

    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $selected_quiz_id = $_GET["quiz-id"];
        $quiz_data = new stdClass();

        $quiz_sql = $connection->prepare("SELECT id, name, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name FROM quizzes WHERE quizzes.id = ?;");
        $quiz_sql->bind_param("s", $selected_quiz_id);
        $quiz_sql->execute();
        $result = $quiz_sql->get_result();
        $quiz = $result->fetch_assoc();
        
        $quiz_data->name = $quiz["name"];
        $quiz_data->user = $quiz["user_full_name"];

        $questions_sql = $connection->prepare("SELECT id, text FROM questions WHERE questions.quiz_id = ?;");
        $questions_sql->bind_param("s", $quiz["id"]);
        $questions_sql->execute();
        $questions_result = $questions_sql->get_result();

        $i = 1;
        $quiz_data->questions = new stdClass();
        while($question = $questions_result->fetch_assoc()){
            $quiz_data->questions->{"question" . $i}->text = $question["text"];
            $i++;

            $options_sql = $connection->prepare("SELECT text, correct FROM options WHERE options.question_id = ?;");
            $options_sql->bind_param("s", $question["id"]);
            $options_sql->execute();
            $options_result = $options_sql->get_result();

            $j = 1;
            $quiz_data->questions->{"question" . ($i-1)}->options = new stdClass();
            while($option = $options_result->fetch_assoc()){
                $quiz_data->questions->{"question" . ($i-1)}->options->{"option" . $j}->text = $option["text"];
                $quiz_data->questions->{"question" . ($i-1)}->options->{"option" . $j}->correct = $option["correct"];
                $j++;
            }
        }

        echo json_encode($quiz_data);
    }
?>