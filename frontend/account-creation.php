<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./styles/reset.css">
    <link rel="stylesheet" type="text/css" href="./styles/login.css">
    <link rel="stylesheet" type="text/css" href="./styles/styles.css">
    <script src="https://kit.fontawesome.com/c818a7c46a.js" crossorigin="anonymous"></script>
    <title>Diskuti | Create Account</title>
</head>
<body>
    <main class="horizontal">
        <section class="banner vertical">
            <h2>Quizz - Discuss - Connect</h2>
            <img src="./resources/banner-img.svg" alt="Account Creation and Login pages' banner image">
        </section>
        
        <section class="area vertical">
            <div class="area-banner">
                <img src="./resources/logo.png" alt="">
                <h1>Create an Acount</h1>
                <span class="external-link">Already have an account? <a href="./login.php" id="redirect">Log In</a></span>
            </div>
            <div class="area-form">                
                <form action="#" id="account-form"> 
                    <div class="input-box">
                        <div class="horizontal full-name" id="fullname">
                            <input type="text" name="first-name" id="first-name" placeholder="First name" required>
                            <input type="text" name="last-name" id="last-name" placeholder="Last name" required>
                        </div>
                        <span id="name-error"></span>
                    </div>
                    <div class="input-box">
                        <input type="email" name="email" id="email" placeholder="Email" required>
                        <span id="email-error"></span>
                    </div>
                    <div class="input-box">
                        <div id="input-wrapper">
                            <input class="txt-input" type="password" name="password" id="password" placeholder="Password" maxlength="256" required>
                            <div class="vertical-separator"></div>
                            <span class="toggle-password fa-solid fa-eye" id="toggle-eye"></span>
                        </div>
                        <span id="password-error"></span>
                    </div>
                    <input type="button" name="send-btn" id="send-btn" value="Create Account">
                </form>
            </div>
        </section>
    </main>

    <script src="./scripts/account-creation.js"></script>
</body>
</html>