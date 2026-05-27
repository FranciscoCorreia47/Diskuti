<?php
    include "config.php";

    if(isset($_GET["user-id"])){
        $user_id = $_GET["user-id"];

        $quiz_sql = $connection->prepare("SELECT id, name, banner, creation_date, submit_count, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name FROM quizzes WHERE quizzes.user_id = ? ORDER BY creation_date DESC;");
        $quiz_sql->bind_param("s", $user_id);
        $quiz_sql->execute();
        $quiz_result = $quiz_sql->get_result();

        $quiz_data = new stdClass();
        $comments = [];

        $i = 1;
        while($row = mysqli_fetch_assoc($quiz_result)){
            $quiz_id = $row["id"];

            $comment_sql = $connection->prepare("SELECT (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE comments.user_id = users.id) AS user_full_name, text, creation_date FROM comments WHERE comments.quiz_id = ?");
            $comment_sql->bind_param("s", $quiz_id);
            $comment_sql->execute();
            $comment_result = $comment_sql->get_result();

            $quiz_data->{"quiz".$i} = new stdClass();
            $quiz_data->{"quiz".$i}->id = $row["id"];
            $quiz_data->{"quiz".$i}->name = $row["name"];
            $quiz_data->{"quiz".$i}->banner = $row["banner"];
            $quiz_data->{"quiz".$i}->creation_date = $row["creation_date"];
            $quiz_data->{"quiz".$i}->submit_count = $row["submit_count"];
            $quiz_data->{"quiz".$i}->user_name = $row["user_full_name"];
            $quiz_data->{"quiz".$i}->comments = new stdClass();

            $j = 1;
            while($comment = mysqli_fetch_assoc($comment_result)){
                $quiz_data->{"quiz".$i}->comments->{"quiz".$j} = new stdClass();
                $quiz_data->{"quiz".$i}->comments->{"quiz".$j}->user_name = $comment["user_full_name"];
                $quiz_data->{"quiz".$i}->comments->{"quiz".$j}->text = $comment["text"];
                $quiz_data->{"quiz".$i}->comments->{"quiz".$j}->creation_date = $comment["creation_date"];

                $j++;
            }
            $i++;
        }


        echo json_encode($quiz_data);
    }
?>