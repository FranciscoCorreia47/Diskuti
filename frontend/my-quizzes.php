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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c818a7c46a.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="./styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./styles/styles.css">
    <link rel="stylesheet" type="text/css" href="./styles/main.css">
    <link rel="stylesheet" type="text/css" href="./styles/my-quizzes.css">
    <script src="https://kit.fontawesome.com/c818a7c46a.js" crossorigin="anonymous"></script>
    <title>Diskuti | My Quizzes</title>
</head>
<body>
    <main class="main">
        <section class="menu vertical">
            <div>
                <ul class="bar vertical">
                <li class="menu-item"><a href="./index.php"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"/></svg></a></li>
                <li class="menu-item create-quiz"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"/></svg></a></li>
                <li class="menu-item" data-user-id="<?php echo $_SESSION['id'] ?>"><a href="./my-quizzes.php"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/></svg></a></li>
                <li class="menu-item" id="user-account" data-user-id="<?php echo $_SESSION['id'] ?>"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.75c3.942 0 7.987 2.563 8.249 7.712a.75.75 0 0 1-.71.787c-2.08.106-11.713.171-15.077 0a.75.75 0 0 1-.711-.787C4.013 15.314 8.058 12.75 12 12.75m0-9a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/></svg></li>
                <li class="menu-item"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg></li>
                </ul>
            </div>
            <div class="overlay">
                <div class="new-quiz">
                <h2>Give it a cool name, make it memorable!</h2>
                <input class="bar" type="text" name="quiz-name" id="quiz-name" placeholder="ie. Amazing Programming Quiz!">
                <button>Create</button>
                </div>
            </div>
        </section>
        <section class="quizzes-section">
            <div class="logo">
                <img src="./resources/diskuti-logo.png" alt="Diskuti's logo">
            </div>
            <h1>My Quizzes</h1>
            <div class="search-box">
                <input type="text" name="search" id="search-bar" placeholder="Search for a specific quiz">
                <span class="fa-solid fa-magnifying-glass search-btn" id="search-btn"></span>
            </div>
            <div class="quizzes-area">
                <h2>Latest</h2>
                <div class="quizzes-list">
                </div>
            </div>
        </section>
        <section class="comment-section">
             <div class="comment-div">

             </div>
        </section>
    </main>

    <script src="./scripts/get-quizzes.js"></script>
</body>
</html>