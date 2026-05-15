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
  <title>Diskuti | Login</title>
</head>
<body>
  <main class="horizontal">
    <!--Image-->
    <section class="banner vertical">
      <h2>Quizz - Discuss - Connect</h2>
      <img src="resources/banner-img.svg" alt="Account Creation and Login pages' banner image">
    </section>

    <!--Login Form-->
    <section class="area vertical">
      <div class="area-banner">
        <img src="resources/diskuti-logo.png" alt="Diskuti's Logo">
        <h1>Welcome Back</h1>
        <h3>Jump back into the discussion!</h3>
      </div>
      <div class="area-form">
        <form action="" id="login-form">
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
          <input class="btn-input" type="button" name="login" id="login-btn" value="Log In">
        </form>
        <div class="separator"></div> <!--A linha que tem de separação-->
        <span class="external-link">Don't have an account? <a href="account-creation.php" id="redirect">Sign Up</a></span>
      </div>
    </section>
  </main>

  <script src="./scripts/login.js"></script>
</body>
</html>
