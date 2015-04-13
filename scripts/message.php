<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (empty($_POST["name"]) 
		|| empty($_POST["email"]) 
		|| empty($_POST["message"])) {
			echo "Message failed to send :(";
		} else {
			$name = safeInput($_POST["name"]);
			$email = safeInput($_POST["email"]);
			$message = safeInput($_POST["message"]);
			$ipaddress = $_SERVER["REMOTE_ADDR"];

			$subject = $name;

			$headers = "";
			$headers .= "Reply-To: Pioneer Magazine <thepioneer@gatech.edu>\r\n"; 
	  		$headers .= "Return-Path: Pioneer Magazine <thepioneer@gatech.edu>\r\n"; 
	  		$headers .= "From: Pioneer Magazine <thepioneer@gatech.edu>\r\n"; 
	  		$headers .= "Organization: Pioneer Magazine\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
			$headers .= "X-Priority: 3\r\n";
			$headers .= "X-Mailer: PHP". phpversion() ."\r\n";

			date_default_timezone_set('America/New_York');
			$date = date('m/d/Y h:i:s a', time());

			$emailTo = 'thepioneer@gatech.edu';
			$emailMessage = "Name: " . $name . "\r\n" . "\r\n" . "Email: " . $email . "\r\n" . "\r\n" . "Time: " . $date . "\r\n" . "\r\n" . "IP: " . $ipaddress . "\r\n" . "\r\n" . "Message: " . "\r\n" . "\r\n" . $message;

			if ( mail($emailTo, $subject, $emailMessage, $headers) ) {
				echo "Message sent!";
			} else {
				echo "Message failed to send :(";
			}
			
			$logFile = file_get_contents('messagelog.txt');
			file_put_contents('messagelog.txt', $logFile . $emailMessage . "\r\n" . "\r\n" . "\r\n" . "\r\n");
		}
	}
	function safeInput($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>