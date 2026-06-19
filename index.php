<?php
  session_start();

  if((!isset($_SESSION["email"]))){
    unset($_SESSION["email"]);
    header("location: frontend/login.php");
    exit();
  }

  $logged_in = ["email"];
?>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="frontend/styles/reset.css">
  <link rel="stylesheet" type="text/css" href="frontend/styles/styles.css">
  <link rel="stylesheet" type="text/css" href="frontend/styles/main.css">
  <link rel="stylesheet" type="text/css" href="frontend/styles/search-quiz.css">
  <link rel="stylesheet" type="text/css" href="frontend/styles/footer.css">
  <link rel="icon" type="image/png" href="frontend/resources/diskuti-icon.png">
  <script src="https://kit.fontawesome.com/c818a7c46a.js" crossorigin="anonymous"></script>
  <script src="https://js.pusher.com/8.0.1/pusher.min.js"></script>
  <title>Diskuti | Home</title>
</head>
<body>
  <div class="overlay">
    <div class="new-quiz">
      <h2>Give it a cool name, make it memorable!</h2>
      <input class="bar" type="text" name="quiz-name" id="quiz-name" placeholder="ie. Amazing Programming Quiz!">
      <button>Create</button>
    </div>
  </div>
  <main>
    <section class="menu vertical">
        <ul class="bar vertical">
          <li class="menu-item"><a href="/index.php"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"/></svg></a></li>
          <li class="menu-item create-quiz"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"/></svg></a></li>
          <li class="menu-item"><a href="frontend/my-quizzes.php?user-id=<?php echo $_SESSION['id'] ?>"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/></svg></a></li>
          <li class="menu-item" id="user-account" data-user-id="<?php echo $_SESSION['id'] ?>"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.75c3.942 0 7.987 2.563 8.249 7.712a.75.75 0 0 1-.71.787c-2.08.106-11.713.171-15.077 0a.75.75 0 0 1-.711-.787C4.013 15.314 8.058 12.75 12 12.75m0-9a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/></svg></li>
          <li class="menu-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg></li>
        </ul>
      </div>
    </section>
    <section class="logo">
      <img src="frontend/resources/logo.svg" alt="Logo">
    </section>
    <section class="search">
      <div class="bar search-input">
        <input type="text" name="search" class="search-bar" placeholder="Search for topic">
        <span class="fa-solid fa-magnifying-glass search-btn"></span>
      </div>
    </section>
    <section class="chatbar vertical">
      <div class="box">
        <div class="chat-title">
          <h1 class="title-text">Chats</h1>
          <button class="new-chat show"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"/></svg></button>
        </div>
        <div class="separator"></div>
        <div class="chat-area">
        </div>
        <div class="write-box hide">
          <input type="text" id="message-input" placeholder="Write a message...">
          <button class="send-message"><svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24" ><path d="m2.6 10.42 7.64 3.34 3.34 7.64c.16.37.52.6.92.6h.05a1 1 0 0 0 .9-.69l5.5-17c.12-.36.02-.75-.24-1.01a.98.98 0 0 0-1.01-.24L2.69 8.55c-.4.13-.67.49-.69.9-.02.42.22.8.6.97m15.85-4.86-4.09 12.63-2.44-5.59c-.1-.23-.28-.41-.52-.52L5.81 9.64l12.63-4.09Z"></path></svg></button>
        </div>
      </div>
    </section>
    <section class="feed">
      <h1>Trending Quizzes</h1>
      <div class="feed-wrapper" data-user-id="<?php echo $_SESSION['id'] ?>">
      </div>
    </section>
    <section class="logout-section">
      <div class="logout-div"></div>
    </section>
    <section class="search-box" data-user-id="<?php echo $_SESSION['id'] ?>">
      <div class="search-area">
        <div class="search-header">
          <img src="frontend/resources/logo.svg" alt="Logo">
          <div class="search-input">
              <input type="text" name="search" class="search-bar" placeholder="Search for topic">
              <span class="fa-solid fa-magnifying-glass search-btn"></span>
          </div>
          <span class="fa-solid fa-x" id="close-search-box"></span>
        </div>
        <div class="search-results"></div>
      </div>
    </section>

    <section class="foot"><?php include "frontend/footer.php" ?></section>
  </main>

  <script src="frontend/scripts/trending-quizzes.js"></script>
  <script src="frontend/scripts/main.js"></script>
  <script src="frontend/scripts/user-logout.js"></script>
  <script src="frontend/scripts/chat.js"></script>
  <script src="frontend/scripts/search-quiz.js"></script>
</body>
</html>
