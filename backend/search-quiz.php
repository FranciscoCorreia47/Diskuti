<?php
    include "config.php";

    if(isset($_POST["search-text"])){
        $search_text = $_POST["search-text"];

        $sql = $connection->prepare("SELECT id, name, creation_date, banner, (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE quizzes.user_id = users.id) AS user_full_name FROM quizzes WHERE name LIKE ?;");
        $sql_param = "%$search_text%";
        $sql->bind_param("s", $sql_param);
        $sql->execute();
        $result = $sql->get_result();

        $quiz_data = [];
        while($row = $result->fetch_assoc()){
            $quiz_data[] = $row;
        }

        echo json_encode($quiz_data);
    }
?>