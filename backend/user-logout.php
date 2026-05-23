<?php
    include "config.php";
    session_start();

    if(isset($_POST["user-id"])){
        $user_id = $_POST["user-id"];
        
        $sql = $connection->prepare("SELECT CONCAT(first_name, ' ', last_name) AS user_full_name, email FROM users WHERE id = ?");
        $sql->bind_param("s", $user_id);
        $sql->execute();
        $result = $sql->get_result();

        $user_info = $result->fetch_assoc();

        echo json_encode($user_info);
    }

    if(isset($_GET["logout"])){
        session_destroy();
        header("Location: ../frontend/login.php");
        exit();
    }
?>