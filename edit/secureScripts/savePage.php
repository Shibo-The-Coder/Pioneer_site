<?PHP

	if ($_POST["authToken"] != "xJe9b4Yk2pz!>;") {
		echo "Authentication Failure";
		return;
	}

	file_put_contents( "../../index.html", $_POST["content"]);

	echo "Saved page";

?>