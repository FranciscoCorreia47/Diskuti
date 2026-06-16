<?php
  include "config.php";

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
  }

  if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode([
      'status' => 'error',
      'message' => "Invalid Method",
      'received_method' => $_SERVER['REQUEST_METHOD']
    ]);
    exit;
  }

  $json = file_get_contents('php://input');
  $requestData = json_decode($json, true);

  if (!is_array($requestData)) {
    $requestData = $_POST;
  }

  if(!isset($requestData['search_text'])){
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => "Invalid body"]);
    exit;
  }

  $search_text = $requestData['search_text'];

  $sql = $connection->prepare("SELECT email, (SELECT CONCAT(first_name, ' ', last_name)) AS full_name FROM users WHERE email LIKE ?;");
  $sql_param = "%$search_text%";
  $sql->bind_param("s", $sql_param);
  $sql->execute();
  $result = $sql->get_result();

  $user_data = [];
  while($row = $result->fetch_assoc()){
    $user_data[] = [ 'email' => $row['email'], 'full_name' => $row['full_name']];
  }
  
  http_response_code(200);
  echo json_encode($user_data);
?>