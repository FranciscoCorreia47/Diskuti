<?php

require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  http_response_code(200);
  echo json_encode(['status' => 'ok']);
  exit;
}

if($_SERVER['REQUEST_METHOD'] !== "POST"){
  http_response_code(405);
  echo json_encode([
    'status' => 'error',
    'message' => "Invalid method",
    'received_method' => $_SERVER['REQUEST_METHOD']
  ]);
  exit;
}

  $json = file_get_contents('php://input');
  $requestData = json_decode($json, true);

  if(!isset($requestData['user_email'])){
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Invalid body"]);
    exit;
  }

  $user_email = $requestData['user_email'];

  if(!$user_email){
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Empty data"]);
    exit;
  }

  $sql = $connection->prepare("SELECT id FROM users WHERE email = ?");
  $sql->bind_param('s', $user_email);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }
  $res = $sql->get_result();

  if(mysqli_num_rows($res) < 1){
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Non existing user']);
    exit;
  }

  foreach($res as $r){
    $user_id = $r["id"];
  }

  $sql = $connection->prepare("SELECT chat_id FROM chat_participants WHERE user_id = ?");
  $sql->bind_param('s', $user_id);
  if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
    exit;
  }
  $res = $sql->get_result();

  $enrolled_chats = [];
  foreach($res as $r){
    $enrolled_chats[] = $r["chat_id"];
  }

  if(empty($enrolled_chats)){
    http_response_code(200);
    echo json_encode(['status' => 'success', 'chats' => []]);
    exit;
  }

  $chat_info = [];

  foreach($enrolled_chats as $ec){
    $sql = $connection->prepare("SELECT (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE chat_participants.user_id = users.id) AS user_name, (SELECT email FROM users WHERE chat_participants.user_id = users.id) AS user_email FROM chat_participants WHERE chat_id = ? AND user_id <> ?");
    $sql->bind_param('ss', $ec, $user_id);
    if (!$sql->execute()) {
      http_response_code(500);
      echo json_encode(['status' => 'error', 'message' => 'Internal Server error']);
      exit;
    }
    $res = $sql->get_result();

    if(mysqli_num_rows($res) < 1){
      http_response_code(400);
      echo json_encode([]);
      exit;
    }

    foreach($res as $data){
      $chat_info[] = [
        "chat_id" => $ec,
        "user_email" => $data["user_email"],
        "user_name" => $data["user_name"]
      ];
    }
  }

  http_response_code(200);
  echo json_encode(['status' => 'success', 'chats' => $chat_info]);
  exit;