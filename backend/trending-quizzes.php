<?php
    include "config.php";

    $sql = $connection->prepare("SELECT id, name, creation_date, banner, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name FROM quizzes ORDER BY submit_count DESC LIMIT 6;");
    $sql->execute();
    $result = $sql->get_result();

    $quiz_data = [];

    while($row = mysqli_fetch_assoc($result)){
        $quiz_data[] = $row;
    }

    echo json_encode($quiz_data);
?>