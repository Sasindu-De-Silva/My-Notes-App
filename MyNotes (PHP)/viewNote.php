<?php
require "connection.php";

$details = json_decode(file_get_contents("php://input"));
$id = $details->id;


$rs1 = Database::search("SELECT * FROM `note` WHERE `id` ='" . $id . "'");
$n1 = $rs1->num_rows;

// for ($x = 0; $x < $n1; $x++) {
$f1 = $rs1->fetch_assoc();
// $f = $f1;
// }
echo json_encode($f1);
