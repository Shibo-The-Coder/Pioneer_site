<?php

$pageNum = $_GET["pageNum"];

//find the names of all posts in order of how recent they are. Variable name: $filenames
$lines = explode( "\n", str_replace( "\n\r", "\n", file_get_contents( "../blog/index.txt" ) ) );
$titles = array();
$dates = array();
$filenames = array();
$authors = array();

foreach ( $lines as $line ) {
	$data = explode( "|", $line );
	$titles[] = $data[0];
	$dates[] = $data[1];
	$filenames[] = $data[2];
	$authors[] = $data[3];
}

$num = 0;
for ( $count = ($pageNum * 10); ($count < count( $titles )) && ($num < 10); $count++ ) {
	$num++;
	echo( "<div class = 'blogPost' filename = \"" . $filenames[$count] .  "\">" . file_get_contents( "../blog/posts/" . $filenames[$count] . ".html" ) . "</div>" );
}

if ( $count < count( $titles ) ) echo "<div id = \"blogLoading\"></div>";

?>