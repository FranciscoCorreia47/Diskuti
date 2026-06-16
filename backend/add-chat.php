<?php

require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  http_response_code(200);
  echo json_encode(['status' => 'ok']);
  exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    'status' => 'error',
    'message' => 'Invalid method',
    'received_method' => $_SERVER["REQUEST_METHOD"]
  ]);
  exit();
}

$json = file_get_contents('php://input');
$requestData = json_decode($json, true);

if (!is_array($requestData)) {
  $requestData = $_POST;
}

if (!isset($requestData['emails']) || !is_array($requestData['emails'])) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid body']);
  exit();
}

$connection->execute_query("INSERT INTO chats (creation_date) VALUES (NOW());");
$chat_id = $connection->insert_id;
$emails = $requestData['emails'];

foreach ($emails as $email) {
  $sql = $connection->prepare('SELECT id FROM users WHERE email = ?;');
  $sql->bind_param('s', $email);
  $sql->execute();

  $result = $sql->get_result();
  $uid = null;

  if ($row = $result->fetch_assoc()) {
    $uid = $row['id'];
  }

  if (!$uid) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'User not found', 'email' => $email]);
    exit();
  }

  $sql = $connection->prepare('INSERT INTO chat_participants (user_id, chat_id) VALUES (?,?);');
  $sql->bind_param('ii', $uid, $chat_id);
  $sql->execute();
}

http_response_code(200);
echo json_encode(['status' => 'ok', 'message' => 'Done']);
exit();
