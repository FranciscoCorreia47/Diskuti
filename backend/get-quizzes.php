<?php
    include "config.php";

    $sql = $connection->prepare("SELECT name, banner, creation_date,(SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name FROM quizzes ORDER BY creation_date DESC;");
    $sql->execute();
    $result = $sql->get_result();

    $quiz_data = [];

    while($row = mysqli_fetch_assoc($result)){
        $quiz_data[] = $row;
    }

    echo json_encode($quiz_data);
?>