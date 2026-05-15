<?php

require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  if(!isset($_POST['chat_id']) || !isset($_POST['user'])){
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Invalid body"]);
    exit;
  }

  $chat_id = $_POST['chat_id'];
  $user_email = $_POST['user'];

  if(!$chat_id || !$user_email){
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Empty data"]);
    exit;
  }

  $sql = $connection->prepare("SELECT * FROM chat_participants WHERE chat_id = ?");
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

  $sql = $connection->prepare("SELECT id FROM users WHERE email = ?");
  $sql->bind_param('%s', $user_email);
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
      $user_id = $row['id'];
    }
  }

  if (!in_array($user_id, $participants)){
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'User is not a participant of the chat']);
    exit;
  }

  $sql = $connection->prepare("SELECT * FROM messages WHERE chat_id = ?");
  $sql->bind_param('%s', $chat_id);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }

  $result = $sql->get_result();

  $messages = [];

  if(mysqli_num_rows($result) < 1){
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'No history']);
    exit;
  } else {
    foreach($result as $row){
      $messages[] = ['text' => $row['text'], 'sent' => ($user_id == $row['user_id']), 'send_date' => $row['send_date']];
    }
  }

  http_response_code(200);
  echo json_encode($messages);

} else {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => "Can't use GET"]);
  exit;
}