<?php 
	//Declaring vars
	$pageid = 0;
	$articleid = 0;
	//Check for GET requests and Hashes
	/*
	$url=parse_url($_SERVER["REQUEST_URL"]);
	$fragments = $url["fragment"];
	echo $_SERVER["REQUEST_URL"];
	if(isset($_GET['page'])) $pageid = htmlspecialchars($_GET['page']);
	if(isset($_GET['article'])) $articleid = htmlspecialchars($_GET['article']);*/
	//Checks that input is a numeric ID
	if (!is_numeric($pageid) || !is_numeric($articleid)) { //if not numeric, error.
		echo "Error 404 - Sorry, we cannot find what you are looking for.";
	} 
	else{ //get info from db.
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "pioneer";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password,$dbname);
		
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}

		//Homepage tiles:
		$articles_sql = "SELECT title, authorID, short_description,image FROM Articles WHERE status='2'  ORDER BY ID DESC Limit 5";
		$articles_query = mysqli_query($conn, $articles_sql);
		$user_sql = "SELECT ID, fname, lname FROM Users";
		$user_query = mysqli_query($conn, $user_sql);
		
		echo "<h1>Latest News:</h1>";
		echo "<div id='tiles'>";
				if (mysqli_num_rows($articles_query) > 0) {
					// output data of each row
					while($article = mysqli_fetch_assoc($articles_query)) {
						$user_sql = "SELECT ID, fname, lname FROM Users Where ID ='".$article["authorID"]."'";
						$user_query = mysqli_fetch_assoc(mysqli_query($conn, $user_sql));
						echo "<div class='blogPost tile'>
								<div class='postContent'>";
						if(!empty($article["image"])) echo "<img src='". $article["image"]."' title='' class='postImage'/><br/>";
						echo "	<span class='postTitle'>" . $article["title"]. "</span> 
									<span class='postDate'>23 February 2015</span>
									<div class='postAuthor'>" . $user_query["fname"]." ". $user_query["lname"]. "</div>
									<br>
									<!-- content -->
									" . $article["short_description"]. "
									<!-- /content -->
									<div class='postFooter'>
										<div class='postFooterLast'></div>
										<div class='postFooterNext'></div>
										<div class='postFooterList'></div>
									</div>
								</div>
							</div>";
					}
				} else {
					echo "0 results";
				}

		echo "</div'>";
		//END Homepage tiles
		mysqli_close($conn);
		
	}
	
?>
		
<div id = "content">
	<?php include_once('page/about.php');?>		
	<?php include_once('page/contact.php');?>		
	<?php include_once('page/articles.php');?>					
</div>