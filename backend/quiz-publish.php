<?php
  
if($_SERVER['REQUEST_METHOD'] == 'POST'){
  header("Content-Type: application/json");

  if(isset($_POST['data']))
    $quiz_data = json_decode($_POST['data'], true);
  else {
    $response = ['status' => 'error', 'message' => 'No quiz sent'];
    http_response_code(400);
    echo json_encode($response);
    exit;
  }

  if ($quiz_data) {
    $response = ['status' => 'success', 'message' => 'Data ok'];
    http_response_code(200);
  } else {
    $response = ['status' => 'error', 'message' => 'Empty quiz'];
    http_response_code(400);
    echo json_encode($response);
    exit;
  }

  require_once "config.php";


  /** Getting the owner ID */
  $owner_email = $quiz_data["owner"];

  $sql = $connection->prepare("SELECT id FROM users WHERE email LIKE ?;");
  $sql->bind_param("s", $owner_email);
  if (!$sql->execute()) {
    $response = ['status' => 'error', 'message' => 'Database error looking up user'];
    http_response_code(500);
    echo json_encode($response);
    exit;
  }

  $result = $sql->get_result();

  if(mysqli_num_rows($result) < 1){
    $response = ['status' => 'error', 'message' => 'Invalid logged in user'];
    http_response_code(401);
    echo json_encode($response);
    exit;
  }
  else{
    foreach($result as $row){
      $owner = $row['id'];
    }
  }
  /** <---------------------------> */

  /** Inserting all data */
  $name = $quiz_data['name'];
  $questions = $quiz_data['questions'];

  // Checking for banner
  if(isset($_FILES['banner'])){
    $banner = $_FILES['banner'];
    $dir = 'banners/';
    $banner_name = $banner['name'];
    $fileExt = pathinfo($banner_name, PATHINFO_EXTENSION);

    $local_name = $owner_email . "_" . str_replace(' ', '_', $name) . "." . $fileExt;
    $fullPath = $dir . $local_name;
    move_uploaded_file($_FILES['banner']['tmp_name'], $fullPath);
  }

  // Inserting the quiz
  $sql = $connection->prepare("INSERT INTO quizzes(name, banner, user_id) VALUES(?,?,?)");
  $sql->bind_param("sss", $name, $fullPath, $owner);
  if (!$sql->execute()) {
    $response = ['status' => 'error', 'message' => 'Error inserting quiz'];
    http_response_code(500);
    echo json_encode($response);
    exit;
  }

  // Getting the inserted quiz's ID
  $sql = $connection->prepare("SELECT id FROM quizzes WHERE name LIKE ? AND user_id LIKE ?;");
  $sql->bind_param("ss", $name, $owner);
  if (!$sql->execute()) {
    $response = ['status' => 'error', 'message' => 'Error getting quiz ID'];
    http_response_code(500);
    echo json_encode($response);
    exit;
  }

  $result = $sql->get_result();

  if(mysqli_num_rows($result) < 1){
    $response = ['status' => 'error', 'message' => 'Error inserting quiz'];
    http_response_code(400);
    echo json_encode($response);
    exit;
  }
  else{
    foreach($result as $row){
      $quiz_id = $row['id'];
    }
  }


  foreach($questions as $question){
    $q_prompt = $question['prompt'];
    $q_type = $question['type'];
    $q_opts = $question['options'];
    
    // Inserting each question
    $sql = $connection->prepare("INSERT INTO questions(quiz_id, type, text) VALUES(?, ?, ?)");
    $sql->bind_param("sss", $quiz_id, $q_type, $q_prompt);
    if (!$sql->execute()) {
      $response = ['status' => 'error', 'message' => 'Error inserting question'];
      http_response_code(500);
      echo json_encode($response);
      exit;
    }

    // Getting the inserted question's ID
    $sql = $connection->prepare("SELECT id FROM questions WHERE text LIKE ? AND quiz_id LIKE ?;");
    $sql->bind_param("ss", $q_prompt, $quiz_id);
    if (!$sql->execute()) {
      $response = ['status' => 'error', 'message' => 'Error getting question ID'];
      http_response_code(500);
      echo json_encode($response);
      exit;
    }

    $result = $sql->get_result();

    if(mysqli_num_rows($result) < 1){
      $response = ['status' => 'error', 'message' => 'Error inserting question'];
      http_response_code(400);
      echo json_encode($response);
      exit;
    }
    else{
      foreach($result as $row){
        $quest_id = $row['id'];
      }
    }

    foreach($q_opts as $opts){
      $opt_txt = $opts['text'];
      $correct = $opts['correct'];
      
      // Inserting each option
      $sql = $connection->prepare("INSERT INTO options(qstn_id, correct, text) VALUES(?, ?, ?)");
      $sql->bind_param("sds", $quest_id, $correct, $opt_txt);
      if (!$sql->execute()) {
        $response = ['status' => 'error', 'message' => 'Error inserting option'];
        http_response_code(500);
        echo json_encode($response);
        exit;
      }
    }
  }
  /** <---------------------------> */

  echo json_encode($response);
} else {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => "Can't use GET"]);
}
?>