<?PHP

	if ($_POST["authToken"] != "xJe9b4Yk2pz!>;") {
		echo "Authentication Failure";
		return;
	}

	file_put_contents( "../../blog/posts/" . $_POST["postFilename"] . ".html", $_POST["postContent"]);

	$index = file_get_contents( "../../blog/index.txt" );

	$indexBeginning = [];
	$indexEnd = [];

	$beginning = true;

	$lines = explode( "\n", $index );
	foreach ( $lines as $line ) {
		$info = explode( "|", $line );
		if ($info[2] == $_POST["postFilename"]) {
			$beginning = false;
		} else if ( $beginning ) {
			$indexBeginning[] = $line;
		} else {
			$indexEnd[] = $line;
		}
	}

	$newIndex = trim( implode( "\n", $indexBeginning) . "\n" . $_POST["postTitle"] . "|" . $_POST["postDate"] . "|" . $_POST["postFilename"] . "|" . $_POST["postAuthor"] . "\n" . implode( "\n", $indexEnd) );

	file_put_contents( "../../blog/index.txt", $newIndex );

	echo "Saved " . $_POST["postTitle"];

?>