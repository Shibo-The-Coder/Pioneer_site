<?php 
	function get_articles($article_id,$article_limit,$article_status){
		/*
		 *Requires a connection to be opened.
		 *Arguments:
		 *	$article_id => numeric. If passed, will get the database information for that article ID only
		 *	$article_limit => numeric. If passed, will set a limit to the number of articles fetched from database. Default = 5
		 *	$article_status=> numeric. If passed, will fetch the articles with that status. 2 = published. 1 = draft. 0 = deleted. Default = 2
		 */
		$article_limit = $article_limit == null ? 5 : $article_limit; //Checks if a limit has been inputted, if not, then it sets it to default.
		$article_status = $article_status == null ? 2 : $article_status; //Checks if a status has been inputted, if not, then it sets it to default. 
		global $conn; //Get $conn from database_connection.php
		if ($article_id!=null){ //If null, fetch ALL articles in database. For more info, check Arguments in the comments at the top of this function.
			if (!is_numeric($article_limit)||!is_numeric($article_status)||!is_numeric($article_id)){die("An error has occurred.");} //Catching naughty hackers.
			$articles_sql = "SELECT `ID`, `title`, `authorID`, `image`, `short_description`, `content`, `sources`, `issue`, `categories`, `tags`, `date`, `status` FROM Articles WHERE status='".$article_status."' AND ID='".$article_id."' ORDER BY ID DESC Limit ".$article_limit;}
		else{ //If not null, fetch the specific articles in database with that ID. For more info, check Arguments in the comments at the top of this function.
			if (!is_numeric($article_limit)||!is_numeric($article_status)){die("An error has occurred.");} //Catching naughty hackers.
			$articles_sql = "SELECT `ID`, `title`, `authorID`, `image`, `short_description`, `content`, `sources`, `issue`, `categories`, `tags`, `date`, `status` FROM Articles WHERE status='".$article_status."' ORDER BY ID DESC Limit ".$article_limit;
		}
		$articles_query = mysqli_query($conn, $articles_sql); //Send sql statement to database.
		if (!$articles_query) {
			die("Connection failed: " . mysqli_connect_error());
		}
		return $articles_query;
	}
	
	function get_author($user_id){
		/*
		 *Requires a connection to be opened.
		 *Arguments:
		 *	$user_id => numeric. If passed, will get the database information for that user ID only
		 */
		global $conn; //Get $conn from database_connection.php
		if ($user_id!=null){ //If null, fetch ALL users in database. For more info, check Arguments in the comments at the top of this function.
			$user_sql = "SELECT ID, fname, lname FROM Users Where ID ='".$user_id."'";
		}
		else{//If not null, fetch the specific user in database with that ID. For more info, check Arguments in the comments at the top of this function.
			$user_sql = "SELECT ID, fname, lname FROM Users";
		}
		$user_query = mysqli_query($conn, $user_sql); //Send sql statement to database.
		if (!$user_query) {
			die("Connection failed: " . mysqli_connect_error());
		}
		return $user_query;
	}	
	
?>
