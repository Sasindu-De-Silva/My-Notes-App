<?php
require "connection.php";

$details = json_decode(file_get_contents("php://input"));

$title = $details->title;
$category = $details->category;
$description = $details->description;
$mobile = $details->mobile;

if (empty($title)) {
    echo "Please enter the title";
} else if (empty($description)) {
    echo "Please enter the description";
} else {

    $rs1 = Database::search("SELECT * FROM `note_category` WHERE `name` ='" . $category . "'");
    $f1 = $rs1->fetch_assoc();
    $categoryId = $f1["id"];

    // create DateTime object
    $d = new DateTime();
    $tz = new DateTimeZone("Asia/Colombo");
    $d->setTimezone($tz);
    $date = $d->format("Y-m-d H:i:s");

    Database::iud("INSERT INTO `note`(`title`,`description`,`note_category_id`,`date_time`,`user_mobile`) VALUES('" . $title . "','" . $description . "','" . $categoryId . "','" . $date . "','" . $mobile . "')");
    echo "Saved";
}
