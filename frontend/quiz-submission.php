<?php
  session_start();

  if((!isset($_SESSION["email"]))){
    unset($_SESSION["email"]);
    header("location: login.php");
    exit();
  }

  $logged_in = ["email"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/styles.css">
    <link rel="stylesheet" href="./styles/quiz-creation.css">
    <link rel="stylesheet" href="./styles/quiz-submission.css">
    <script src="https://kit.fontawesome.com/c818a7c46a.js" crossorigin="anonymous"></script>
    <title>Diskuti | Quiz Submission</title>
</head>
<body>
    <section class="top-bar horizontal">
      <ul class="horizontal top-menu">
        <li>
          <a href="./index.php"><img src="./resources/diskuti-logo.png" alt="Diskuti's logo"></a>
        </li>
        <li>
          <h1 id="quiz-name">Quizz Name</h1>
        </li>
        <li class="buttons">
          <button id="return">Return</button>
          <button id="submit">Submit</button>
        </li>
      </ul>
    </section>
    <section class="questions-section"></section>
    <div id="result-box" class="result-box" style="display:none;"></div>
    <div id="comment-box" class="comment-box" style="display:none;"></div>

    <script src="./scripts/entire-quiz.js"></script>
</body>
</html>