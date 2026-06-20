<?php
include "config.php";

if (isset($_GET["user-id"])) {
    $user_id = $_GET["user-id"];

    // Use standard object-oriented statements to match get_result()
    $quiz_sql = $connection->prepare("
        SELECT q.id, q.name, q.banner, q.creation_date, q.submit_count, 
               CONCAT(u.first_name, ' ', u.last_name) AS user_full_name 
        FROM quizzes q
        JOIN users u ON q.user_id = u.id
        WHERE q.user_id = ? 
        ORDER BY q.creation_date DESC
    ");
    $quiz_sql->bind_param("s", $user_id);
    $quiz_sql->execute();
    $quiz_result = $quiz_sql->get_result();

    // We will build an associative array which converts safely to a clean JSON object
    $quiz_data = [];
    $i = 1;

    while ($row = $quiz_result->fetch_assoc()) {
        $quiz_id = $row["id"];

        $comment_sql = $connection->prepare("
            SELECT CONCAT(u.first_name, ' ', u.last_name) AS user_full_name, c.text, c.creation_date 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.quiz_id = ?
        ");
        $comment_sql->bind_param("i", $quiz_id);
        $comment_sql->execute();
        $comment_result = $comment_sql->get_result();

        $comments_list = [];
        $j = 1;
        while ($comment = $comment_result->fetch_assoc()) {
            // Fixes the dynamic object property crash
            $comments_list["comment" . $j] = [
                "user_name"     => $comment["user_full_name"],
                "text"          => $comment["text"],
                "creation_date" => $comment["creation_date"]
            ];
            $j++;
        }

        $quiz_data["quiz" . $i] = [
            "id"            => $row["id"],
            "name"          => $row["name"],
            "banner"        => $row["banner"],
            "creation_date" => $row["creation_date"],
            "submit_count"  => $row["submit_count"],
            "user_name"     => $row["user_full_name"],
            "comments"      => $comments_list
        ];
        $i++;
    }

    header('Content-Type: application/json');
    echo json_encode($quiz_data);
}
?>