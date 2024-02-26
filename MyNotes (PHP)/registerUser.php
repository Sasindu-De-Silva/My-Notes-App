<?php
require "connection.php";

$details = json_decode(file_get_contents("php://input"));

$firstName = $details->firstName;
$lastName = $details->lastName;
$mobile = $details->mobile;
$password = $details->password;
$usertype = $details->userType;


if (empty($firstName)) {
    echo "Please enter the first name";
} else if (strlen($firstName) > 45) {
    echo "First name must be less than 45 characters";
} else if (empty($lastName)) {
    echo "Please enter the last name";
} else if (strlen($lastName) > 45) {
    echo "Last name must be less than 45 characters";
} else if (strlen($mobile) != 10) {
    echo "Invalid mobile number";
} else if (preg_match("/07[0,1,2,4,5,6,7,8][0-9]+/", $mobile) == 0) {
    echo "Invalid mobile number";
} else if (empty($password)) {
    echo "Please enter the password";
} else if (strlen($password) < 5 || strlen($password) > 20) {
    echo "Password length must between 5 to 20";
} else {

    $rs = Database::search("SELECT * FROM `user` WHERE `mobile`='" . $mobile . "'");
    $n = $rs->num_rows;

    if ($n == 0) {
        $rs1 = Database::search("SELECT * FROM `user_type` WHERE `name` ='" . $usertype . "'");
        $f1 = $rs1->fetch_assoc();
        $userTypeId = $f1["id"];

        Database::iud("INSERT INTO `user`(`first_name`,`last_name`,`mobile`,`password`,`user_type_id`) VALUES('" . $firstName . "','" . $lastName . "','" . $mobile . "','" . $password . "','" . $userTypeId . "')");
        echo "Registration successfully";
    } else {
        echo "Mobile already exist";
    }
}

// insert to database