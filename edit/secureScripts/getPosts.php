<?php

//find the names of all posts in order of how recent they are. Variable name: $filenames
$lines = explode( "\n", str_replace( "\n\r", "\n", file_get_contents( "../../blog/index.txt" ) ) );
$titles = array();
$dates = array();
$filenames = array();
$authors = array();

foreach ( $lines as $line ) {
	$data = explode( "|", $line );	
	echo "<option value = \"" . $data[2] . "|" . $data[3] . "\">" . $data[0] . "</option>";
}

?>