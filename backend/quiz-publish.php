<?php

header("Content-Type: application/json");

$quiz_data = file_get_contents('php://input');

if ($quiz_data) {
  $response = ['status' => 'success', 'message' => 'Backend working'];
  http_response_code(200);
} else {
  $response = ['status' => 'error', 'message' => 'No quiz sent'];
  http_response_code(400);
}



echo json_encode($response);

?>