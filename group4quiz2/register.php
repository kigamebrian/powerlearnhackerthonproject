
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
	<?php
	//connect to the database
	session_start();
	define("DB_SERVER", "localhost");
	define("DB_USER", "root");
	define("DB_PASSWORD", "");
	define("DB_DATABASE", "plp");

	$connection = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);
	date_default_timezone_set('Africa/Nairobi');
	$error="";

	if (!$connection) {
	  die("Could'nt connect to the database " . mysqli_error($connection));
	}
//accept values from the form
			if (isset($_POST['register'])){
				$username=((isset($_POST['username']))?mysqli_real_escape_string($connection,$_POST['username']):'');
				$email=((isset($_POST['email']))?mysqli_real_escape_string($connection, $_POST['email']):'');
				$password=((isset($_POST['password']))?mysqli_real_escape_string($connection, $_POST['password']):'');
				$confirm=((isset($_POST['confirm']))?mysqli_real_escape_string($connedction, $_POST['confirm']):'');
				$errors =array();
	// the password errors
				if($_POST){
					$uppercase = preg_match('@[A-Z]@', $password);
					$lowercase = preg_match('@[a-z]@', $password);
					$number    = preg_match('@[0-9]@', $password);
					$specialChars = preg_match('@[^\w]@', $password);
					$emailQuery =$connection->query("SELECT * FROM user WHERE email='$email'");
					$emailCount=mysqli_num_rows($emailQuery);

					if($emailCount !=0){
						$errors[]='that email already exists';
					}

					$required=array('name','email','confirm','confirm','permissions');
					foreach($required as $f){
						if(empty($_POST[$f])){
							$errors[]='Please fill all fields !';
							break;
						}
					}
					if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
							$errors[]='Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.';
				}
					if ($password != $confirm){
						$errors[]='Your password do not match';
					}
					if (!filter_var($email,FILTER_VALIDATE_EMAIL)){
						$errors[] ='enter a valid email';
					}

					else
					{
						//register if everything is okey

						$hashed=password_hash($password,PASSWORD_DEFAULT);
						$sql="INSERT INTO  user (username,email,password) VALUES ('$username','$email','$hashed')";
						if ($connection->query($sql) === TRUE) {
							 echo "New record created successfully";
						} else {
							echo "Error: " . $sql . "<br>" . $connection->error;
							}

						$_SESSION['success_flash'] ='you have registered !';
						header('Location:login.php');


					}
				}
			}
?>

	<!-- main  regitser form-->
	<div class="main-w3layouts wrapper">
		<h1>registration Form</h1>
		<div class="main-agileinfo">
			<div class="agileits-top">
				<form action="register.php" method="post">
					<input class="text" type="text" name="username" placeholder="Username" required="">
					<input class="text email" type="email" name="email" placeholder="Email" required="">
					<input class="text form-control" type="password" name="password" placeholder="Password" required=""><br>
					<input class="text form-control pass" type="password" name="confirm" placeholder="Confirm Password" required="">
					<div class="wthree-text">
						<label class="anim">
							<input type="checkbox" class="checkbox" required="">
							<span>I Agree To The Terms & Conditions</span>
						</label>
						<div class="clear"> </div>
					</div>
				    <input type="submit" name="register" class="btn btn-primary" value="register">
				</form>
				<p>Don't have an Account? <a href="login.php"> Login Now!</a></p>
			</div>
		</div>
		<!-- copyright -->

		<!-- //copyright -->

	</div>
	<!-- //main -->
</body>
</html>
