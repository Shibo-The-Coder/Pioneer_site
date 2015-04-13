<html>
	<head>
		<title>Send Mail</title>
	</head>
	<body>
		<?php
			$email = "thepioneer@gatech.edu";
			$subject = $_POST['subject'];
			$message = $_POST['message'];

			if (!preg_match("/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/", $email)) {
			  echo "<h4>Invalid email address</h4>";
			  echo "<a href='javascript:history.back(1);'>Back</a>";
			} elseif ($subject == "") {
			  echo "<h4>No subject</h4>";
			  echo "<a href='javascript:history.back(1);'>Back</a>";
			} elseif (mail($email,$subject,$message)) {
			  echo "<h4>Thank you for sending email</h4>";
			} else {
			  echo "<h4>Can't send email to $email</h4>";
			}
		?>
	</body>
</html>