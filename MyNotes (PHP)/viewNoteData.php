<?php
require "connection.php";

$details = json_decode(file_get_contents("php://input"));
$mobile = $details->mobile;

$rs1 = Database::search("SELECT * FROM `note` WHERE `user_mobile` ='" . $mobile . "'");
$n1 = $rs1->num_rows;

if ($n1 == 0) {
    echo '[{"id":"0"}]';
} else {
    for ($x = 0; $x < $n1; $x++) {
        $f1[] = $rs1->fetch_assoc();
        $f = $f1;
    }
    echo json_encode($f);
}
