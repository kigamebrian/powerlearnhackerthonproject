<?php
session_start();

// Check if the user is logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

?>
<!DOCTYPE html>
<html>
<head>
<title>Group 4 Auth system </title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--Bootstrap CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!-- JS library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Bootstrap JS -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>

<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />

<!-- //web font -->
</head>
<body>
	<!-- main -->
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class=page-title>Hello you have been aunthenticated successfully</h1>
        <a href="logout.php" type="button" class="btn btn-primary"> logout</a>
      </div>

    </div>

	</div>
	<!-- //main -->
</body>
</html>
