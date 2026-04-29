<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/reset.css">
  <link rel="stylesheet" href="./styles/styles.css">
  <link rel="stylesheet" href="./styles/quiz-creation.css">
  <title>Diskuti | Quizz Maker</title>
</head>
<body>
  <main>
    <section class="top-bar horizontal">
      <ul class="horizontal top-menu">
        <li>
          <a href="./index.php"><img src="./resources/logo.png" alt="Diskuti's logo"></a>
        </li>
        <li>
          <h1>Quizz Name</h1>
        </li>
        <li class="buttons">
          <button class="share">Share</button>
          <button class="publish">Publish</button>
        </li>
      </ul>
    </section>
    <section class="side-bar vertical">
      <ul class="side-menu vertical">
        <li id="text">
          <img src="./resources/text.png" alt="Text">
          <span class="item-txt">Text</span>
        </li>
        <li id="checkbox">
          <img src="./resources/checkbox.png" alt="Checkbox">
          <span class="item-txt">Checkbox</span>
        </li>
        <li id="radio">
          <img src="./resources/radio.png" alt="Radio">
          <span class="item-txt">Radio</span>
        </li>
        <li id="section">
          <label for="imageInput" class="upload-label">
            <img src="./resources/upload.png" id="preview" alt="Upload Quiz Image">
            <span class="item-txt">Upload Quiz Image</span>
          </label>
          <input type="file" id="imageInput" accept="image/*" hidden>
        </li>
      </ul>
    </section>
    <section class="preview-area">
      <div class="quiz-name preview">
        <h1></h1>
      </div>
    </section>
  </main>
  <script src="./scripts/quiz-creation.js"></script>
</body>
</html>