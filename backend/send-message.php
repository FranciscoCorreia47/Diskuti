<?php

require_once('config.php');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  
  if(!isset($_POST['chat_id']) || !isset($_POST['text']) || !isset($_POST['send_date']) || !isset($_POST['user_email'])){
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => "Invalid body"]);
    exit;  
  }

  $sql = $connection->prepare('SELECT id FROM users WHERE email = ?');
  $sql->bind_param("s", $_POST['user_email']);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }

  $result = $sql->get_result();
  if(mysqli_num_rows($result) < 1){
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Non existing user']);
    exit;
  } else {
    foreach($result as $row){
      $usr_id = $row['id'];
    }
  }

  $chat_id = $_POST['chat_id'];
  $sql = $connection->prepare("SELECT * FROM chat_participants WHERE chat_id = ?;");
  $sql->bind_param('%s', $chat_id);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }

  $result = $sql->get_result();
  $participants = [];

  if(mysqli_num_rows($result) < 1){
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Non existing chat']);
    exit;
  } else {
    foreach($result as $row){
      $participants[] = $row['user_id'];
    }
  }

  if(!array_search($usr_id, $participants)){
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'User is not a participant of the chat']);
    exit;
  }

  $sql = $connection->prepare("INSERT INTO messages(chat_id, user_id, text, sent_date) VALUES (?,?,?,?);");
  $sql->bind_param("ssss", $_POST['chat_id'], $usr_id, $_POST['text'], $_POST['sent_date']);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }
  echo json_encode(['status' => 'success', 'message' => 'ok']);

  require __DIR__ . './vendor/autoload.php';

  $options = array(
    'cluster' => 'eu',
    'useTLS' => false
  );
  $pusher = new Pusher\Pusher(
    '7766683cddcebf443da1',
    '020347f92a94f1ce13e5',
    '2153453',
    $options
  );

  $data = array(
    'message' => $_POST['text'],
    'user_email' => $_POST['user_email'],
    'sent_date' => $_POST['sent_date'],
  );
  $pusher->trigger('chat-'.$chat_id, 'new-message', $data);

} else {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => "Invalid method"]);
  exit;
}