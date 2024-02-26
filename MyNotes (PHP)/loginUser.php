<?php

require "connection.php";

$details = json_decode(file_get_contents("php://input"));

$mobile = $details->mobile;
$password = $details->password;

if (!empty($mobile) && !empty($password)) {

    $rs = Database::search("SELECT * FROM `user` WHERE `mobile`='" . $mobile . "' AND `password`='" . $password . "'");
    $n = $rs->num_rows;

    if ($n == 0) {
        echo "Invalid mobile or password";
    } else {
        // $f = $rs->fetch_assoc();
        echo "Login success";
    }
} else {
    echo "Check your mobile and password";
}


// search & log