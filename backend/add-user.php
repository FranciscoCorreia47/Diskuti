<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include "config.php";

        $first_name = $_POST["first-name"];
        $last_name = $_POST["last-name"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = $connection->prepare("INSERT INTO users(first_name, last_name, email, password) VALUES(?, ?, ?, ?);");

        $sql->bind_param("ssss", $first_name, $last_name, $email, $password);
        $sql->execute();
    }

?>