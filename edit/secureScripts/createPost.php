<?PHP

	if ($_POST["authToken"] != "xJe9b4Yk2pz!>;") {
		echo "Authentication Failure";
		return;
	}

	$filename = base_convert( strval( time() ), 10, 36 );
	file_put_contents( "../../blog/posts/" . $filename . ".html", $_POST["postContent"]);

	$index = file_get_contents( "../../blog/index.txt" );
	file_put_contents( "../../blog/index.txt", $_POST["postTitle"] . "|" . $_POST["postDate"] . "|" . $filename . "|" . $_POST["postAuthor"] . "\n" . $index );

	echo "Saved " . $_POST["postTitle"];

?>