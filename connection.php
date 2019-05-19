<?php
$link = mysqli_connect("localhost", "root", "", "rpp");
if(mysqli_connect_error()) {
    die("database error".mysqli_connect_error());
    }
?>