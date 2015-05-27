<?php 
/*
 * This script is what appears in the content of the home page.
 */
?>
<div id='tiles'>
<?php
include('scripts_php/database_connection.php');
include('scripts_php/articles.php');
if (isset($_GET['id'])){
	$id = $_GET['id'];
	$conn = connect();
	$articles_array = get_articles($id,null,null);
	 while($article = mysqli_fetch_assoc($articles_array)){
	 	$user = mysqli_fetch_assoc(get_author($article['authorID']));
		echo "<div class='blogPost tile'>
					<div class='postContent'>";
			if(!empty($article["image"])) echo "<img src='". $article["image"]."' title='' class='postImage'/><br/>";
			echo "	<span class='postTitle'>" . $article["title"]. "</span>
						<span class='postDate'>".date('D, F jS Y', strtotime($article["date"]))."</span>
						<div class='postAuthor'>" . $user["fname"]." ". $user["lname"]. "</div>
						<br>
						<!-- content -->
						" . $article["content"]. "
						<!-- /content -->
								<br/>Sources:".$article["sources"]."
								`ID`, `title`, `authorID`, `image`, `short_description`, `content`, `sources`, `issue`, `categories`, `tags`, `date`, `status`
						<div class='postFooter'>
							<div class='postFooterLast'></div>
							<div class='postFooterNext'></div>
							<div class='postFooterList'></div>
						</div>
					</div>
				</div>";
}		

mysqli_close($conn);
}
else{
	header("Location: ./index.php");	
}					
?>

</div>