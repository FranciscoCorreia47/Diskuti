<?php
    include "config.php";

    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $selected_quiz_id = $_GET["quiz-id"];
        $quiz_data = new stdClass();

        $quiz_sql = $connection->prepare("SELECT id, name, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name, (SELECT id FROM users WHERE quizzes.user_id = users.id) AS user_id FROM quizzes WHERE quizzes.id = ?;");
        $quiz_sql->bind_param("s", $selected_quiz_id);
        $quiz_sql->execute();
        $result = $quiz_sql->get_result();
        $quiz = $result->fetch_assoc();
        
        $quiz_data->name = $quiz["name"];
        $quiz_data->user_name = $quiz["user_full_name"];
        $quiz_data->user_id = $quiz["user_id"];

        $questions_sql = $connection->prepare("SELECT id, type, text FROM questions WHERE questions.quiz_id = ?;");
        $questions_sql->bind_param("s", $quiz["id"]);
        $questions_sql->execute();
        $questions_result = $questions_sql->get_result();

        $i = 1;
        $quiz_data->questions = new stdClass();
        while($question = $questions_result->fetch_assoc()){
            $quiz_data->questions->{"question" . $i} = new stdClass();
            $quiz_data->questions->{"question" . $i}->text = $question["text"];
            $quiz_data->questions->{"question" . $i}->type = $question["type"];

            $options_sql = $connection->prepare("SELECT text, correct FROM options WHERE options.qstn_id = ?;");
            $options_sql->bind_param("s", $question["id"]);
            $options_sql->execute();
            $options_result = $options_sql->get_result();

            $j = 1;
            $quiz_data->questions->{"question" . ($i)}->options = new stdClass();
            while($option = $options_result->fetch_assoc()){
                $quiz_data->questions->{"question" . $i}->options->{"option" . $j} = new stdClass();
                $quiz_data->questions->{"question" . $i}->options->{"option" . $j}->text = $option["text"];
                $quiz_data->questions->{"question" . $i}->options->{"option" . $j}->correct = $option["correct"];
                $j++;
            }

            $i++;
        }

        echo json_encode($quiz_data);
    }

    if(isset($_GET["submission"])){
        $quiz_id = $_GET["quiz-id"];

        $sql = $connection->prepare("UPDATE quizzes SET submit_count = submit_count + 1 WHERE id = ?;");
        $sql->bind_param("s", $quiz_id);
        $sql->execute();
    }

    if(isset($_POST["user-comment"])){
        $comment = $_POST["user-comment"];
        $user_id = $_POST["user-id"];
        $comment_quiz_id = $_POST["quiz-id"];

        $sql = $connection->prepare("INSERT INTO comments (user_id, quiz_id, text) VALUES (?, ?, ?);");
        $sql->bind_param("sss", $user_id, $comment_quiz_id, $comment);
        $sql->execute();
    }
?>