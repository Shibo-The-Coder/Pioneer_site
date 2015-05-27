<?php 
/*
 * This script is what appears in the content of the home page.
 */
?>
<h1>Latest News:</h1>
<div id='tiles'>
<?php
include('scripts_php/database_connection.php');
include('scripts_php/articles.php');
$conn = connect();
$articles_array = get_articles(null,null,null);
$users_array = get_author(null);
 while($article = mysqli_fetch_assoc($articles_array)){
	while($users = mysqli_fetch_assoc($users_array)){
		if ($users['ID'] == $article['authorID']){
			$user['ID'] = $users['ID'];
			$user['fname'] = $users['fname'];
			$user['lname'] = $users['lname'];
		}
	}
	echo "<div class='blogPost tile'>
				<div class='postContent'>";
		if(!empty($article["image"])) echo "<img src='". $article["image"]."' title='' class='postImage'/><br/>";
		echo "	<a href='./articles.php?id=".$article['ID']."' class='postTitle'>" . $article["title"]. "</a>
					<span class='postDate'>".date('D, F jS Y', strtotime($article["date"]))."</span>
					<div class='postAuthor'>" . $user["fname"]." ". $user["lname"]. "</div>
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

mysqli_close($conn);					
?>

</div>