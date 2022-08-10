<?php
// Initialize the session
session_start();

// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}

define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE", "plp");

$connection = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);
date_default_timezone_set('Africa/Nairobi');

if (!$connection) {
  die("Could'nt connect to the database " . mysqli_error($connection));
}


// Define variables and initialize with empty values
$email = $password = "";
$username_err = $password_err = $login_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Check if username is empty
    if(empty(trim($_POST["email"]))){
        $username_err = "Please enter email.";
    } else{
        $email = trim($_POST["email"]);
    }

    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if(empty($email_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password FROM user WHERE username = ?";

        if($stmt = mysqli_prepare($connection, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);

            // Set parameters
            $param_email = $email;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);

                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $email, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();

                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["email"] = $email;

                            // Redirect user to welcome page
                            header("location: index.php");
                        } else{
                            // Password is not valid, display a generic error message
                            $login_err = "Invalid username or password.";
                        }
                    }
                } else{
                    // Username doesn't exist, display a generic error message
                    $login_err = "Invalid username or password.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }

    // Close connection
    mysqli_close($connection);
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
	<div class="main-w3layouts wrapper">
		<h1>Group 4 Login Form</h1>
		<div class="main-agileinfo">
			<div class="agileits-top">
				<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
					<input class="text email" type="email" name="email" placeholder="Email" required="">
					<input class="text form-control" type="password" name="password" placeholder="Password" required=""><br>
					<div class="wthree-text">
						<label class="anim">
						<div class="clear"> </div>
					</div>
          <div class="checkbox">
              <label>
                  <input   name="remember" type="checkbox" value="Remember Me">Remember Me
              </label>
          </div>

				   <input type="submit" class="btn btn-lg btn-success btn-block" name="login" value="Login">
				</form>
        <br>
				<p>Don't have an Account? <a href="register.php"> Register Now!</a></p>
			</div>
		</div>
		<!-- copyright -->

		<!-- //copyright -->

	</div>
	<!-- //main -->
</body>
</html>
