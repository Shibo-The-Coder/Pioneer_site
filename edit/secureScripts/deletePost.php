<?php

if ($_POST["authToken"] != "xJe9b4Yk2pz!>;") {
	echo "Authentication Failure";
	return;
}

$filename = $_POST["filename"];

$lines = explode( "\n", str_replace( "\n\r", "\n", file_get_contents( "../../blog/index.txt" ) ) );

$count = 0;
foreach ( $lines as $line ) {
	$data = explode( "|", $line );
	if ($filename == $data[2]) {
		unset( $lines[$count] );
	}
	$count++;
}

file_put_contents( "../../blog/index.txt", implode( "\n", $lines) );
unlink( "../../blog/posts/" . $filename . ".html" );

?>