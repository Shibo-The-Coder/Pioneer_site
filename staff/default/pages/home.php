<?php 
/*
 * This script is what appears in the content of the home page.
 */

//INSERT INTO `pioneer`.`articles` (`ID`, `title`, `authorID`, `image`, `short_description`, `content`, `sources`, `issue`, `categories`, `tags`, `date`, `status`) VALUES (NULL, 'Pioneer is up', '1', 'image.jpg', 'The site is up!', 'The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!The site is up!', 'These are the sources', '0', 'misc', 'up working', '2015-04-30', '2');

?>
<div id='tiles'>
<?php
include('scripts_php/database_connection.php');
include('scripts_php/articles.php');
/*
$conn = connect();
$articles_array = get_articles(null,null,null);
$users_array = get_author(null);

mysqli_close($conn);	
*/				
?>
	<div class='post'>
		<h3>Add a new article:</h3>
		<div class='blogPost tile'>
			<div class='postContent'>
				<span class='postTitle'>New Title</span>
				<span class='postDate'>Date</span>
				<div class='postAuthor'>Session Name</div>
				<br>
				<!-- content -->
		</div>
	</div>




</div>