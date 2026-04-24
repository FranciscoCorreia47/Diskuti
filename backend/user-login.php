<?php
    session_start();

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include "config.php";

        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = $connection->prepare("SELECT * FROM users WHERE email LIKE ? AND password LIKE ?;");
        $sql->bind_param("ss", $email, $password);
        $sql->execute();
        $result = $sql->get_result();

        if(mysqli_num_rows($result) < 1){
            echo "error";
        }
        else{
            $_SESSION["email"] = $email;
            $_SESSION["password"] = $password;
            echo "ok";
        }

    }
?>