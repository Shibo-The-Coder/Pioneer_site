<?php

//get keywords. Variable name: $keywords
$keywords = array();
$searchQueries = explode( "-", htmlspecialchars( $_GET["searchQuery"] ) );
foreach ( $searchQueries as $searchQuery ) {
	if ( strlen( $searchQuery ) > 3 ) {
		$keywords[] = $searchQuery;
	}
}


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

//create three different tiers for results
$priorityTop = "<div class = \"priorityTop\">";
$priorityMiddle = "<div class = \"priorityMiddle\">";
$priorityLow = "<div class = \"priorityLow\">";


$numberOfResults = 0;
//iterate through each file and search for keywords
for ( $count = 0; $count < count( $titles ); $count++ ) {
	$inContents = false;
	$inTitle = false;
	$inTags = false;

	$priority = 0;
	$post = file_get_contents( "../blog/posts/" . $filenames[ $count ] . ".html" );
	$title = $titles[ $count ];
	$tags = substr( $post, ( strpos( $post, "<!--tags" ) + 9 ) , ( strpos( $post, "/tags-->" ) - strpos( $post, "<!--tags" ) - 9 ) );
	$contents = strip_tags( removeImages( substr( $post, ( strpos( $post, "<!-- content -->" ) + 16 ) , ( strpos( $post, "<!-- /content -->" ) - strpos( $post, "<!-- content -->" ) - 16 ) ) ) );
	$date = $dates[ $count ];
	$author = $authors[ $count ];

	//create list items for each result
	foreach ( $keywords as $keyword ) {

		//create snippets and make keywords bold
		if ( stripos( $contents, $keyword ) !== false ) {
			$contents = makeSnippet( $contents, $keyword );
   			//$contents = str_ireplace( $keyword, "<span class = \"searchContentsHighlight\">" . $keyword . "</span>", $contents );
		}
	}

	//create list items for each result
	foreach ( $keywords as $keyword ) {

		//create snippets and make keywords bold
		if ( stripos( $contents, $keyword ) !== false ) {
   			$inContents = true;
   			$contents = preg_replace('/(' . preg_quote($keyword) . ')/i', "<strong>$1</strong>", $contents);
   			//$contents = str_ireplace( $keyword, "<span class = \"searchContentsHighlight\">" . $keyword . "</span>", $contents );
		}

		if ( stripos( $title, $keyword ) !== false ) {
   			$inTitle = true;
   			$title = preg_replace('/(' . preg_quote($keyword) . ')/i', "<strong>$1</strong>", $title);
   			//$title = str_ireplace( $keyword, "<span class = \"searchTitleHighlight\">" . $keyword . "</span>", $title );
		}

		if ( stripos( $tags, $keyword ) !== false ) {
   			$inTags = true;
		}
	}

	//create snippet if there is no keyword in the contents.... edge case
	if ( !$inContents ) {
		$contents = substr( $contents, 0, min( 45, ( strlen( $contents ) - 1 ) ) ) . "...";
	} else {
		$contents = "..." . $contents . "...";
	}

	//add result to proper tier
	if ( $inTitle && $inTags ) {
		$priorityTop .= "<div class = \"searchResult\"><span class = \"postTitle\" filename = \"" . $filenames[$count] . "\">" . $title . "</span>\n<div class = \"postDate\">" . $date . "</div><br/>\n" . $contents . "\n</div>\n";
		$numberOfResults++;
	} else if ( $inTitle || $inTags ) {
		$priorityMiddle .= "<div class = \"searchResult\"><span class = \"postTitle\" filename = \"" . $filenames[$count] . "\">" . $title . "</span>\n<div class = \"postDate\">" . $date . "</div><br/>\n" . $contents . "\n</div>\n";
		$numberOfResults++;
	} else if ( $inContents ) {
		$priorityLow .= "<div class = \"searchResult\"><span class = \"postTitle\" filename = \"" . $filenames[$count] . "\">" . $title . "</span>\n<div class = \"postDate\">" . $date . "</div><br/>\n" . $contents . "\n</div>\n";
		$numberOfResults++;
	}
}

//close tier divs
$priorityTop .= "</div>";
$priorityMiddle .= "</div>";
$priorityLow .= "</div>";

//post findings
if ( $numberOfResults > 0 ) {
	echo $priorityTop . $priorityMiddle . $priorityLow;
} else if ( $numberOfResults == 0 ) {
	echo "<div class = \"centerTextContainer\"><div class = \"centerText searchText\">No Results Found</div></div>";
}

//helper functions
function removeImages( $string ) {
	return preg_replace("/<img[^>]+\>/i", "", $string);
}

function makeSnippet( $string, $keyword ) {
	$position = stripos( $string, $keyword );
	$start = max( 0, ( $position - 100 ) );
	$end =  min( ( strlen( $string ) - 1 ), ( $position + 100 ) );
	$snippet = str_replace( "<br>", "", str_replace( "<br/>", "", substr( $string, $start, ( $end - $start ) ) ) );
	$count = 0;
	while ( substr_count( $snippet, "<" ) != substr_count( $snippet, ">" ) ) {
		$count++;
		$start = max( 0, ( $position - 100 - $count ) );
		$end =  min( ( strlen( $string ) - 1 ), ( $position + 100 + $count) );
		$snippet = substr( $string, $start, ( $end - $start ) );
	}
	return trim( $snippet );
}


?>