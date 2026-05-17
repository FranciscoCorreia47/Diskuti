<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/styles.css">
    <link rel="stylesheet" href="./styles/quiz-creation.css">
    <link rel="stylesheet" href="./styles/quiz-submission.css">
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
          <button id="share">Return</button>
          <button id="publish">Submit</button>
        </li>
      </ul>
    </section>
    <section class="questions-section">
      <div class="questions-div">
        <h1 class="question">Questão 1</h1>
        <div class="options-div">
          <label><input type="checkbox" class="option" name="question1">Opcao 1</label>
          <label><input type="checkbox" class="option" name="question1">Opcao 1</label>
          <label><input type="checkbox" class="option" name="question1">Opcao 1</label>
          <label><input type="checkbox" class="option" name="question1">Opcao 1</label>
        </div>
      </div>
      <div class="questions-div">
        <h1 class="question">Questão 2</h1>
        <div class="options-div">
          <label><input type="radio" class="option" name="question2">Opcao 2</label>
          <label><input type="radio" class="option" name="question2">Opcao 2</label>
          <label><input type="radio" class="option" name="question2">Opcao 2</label>
          <label><input type="radio" class="option" name="question2">Opcao 2</label>
        </div>
      </div>
    </section>

    <!--<script src="./scripts/entire-quiz.js"></script>-->
</body>
</html>