<?php
    session_start();

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include "config.php";

        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = $connection->prepare("SELECT * FROM users WHERE email = ?;");
        $sql->bind_param("s", $email);
        $sql->execute();
        $result = $sql->get_result();

        if(mysqli_num_rows($result) < 1){
            echo "error";
        }
        else{
            $user = $result->fetch_assoc();
            if(password_verify($password, $user["password"])){
                $_SESSION["id"] = $user["id"];
                $_SESSION["email"] = $email;
                setcookie("usremail", $email, time() + 3600, "/");
                echo "ok";
            }
            else{
                echo "error";
            }
        }
    }
?>