<?php 
/* 
 * This file prepares the template for the site.
 * This is how it's done:
 * It takes in a bunch of files in the templates directory:
 * head + navigation + header(logo+navbar) + page + footer
 * And assembles them into one page! Hides the clutter and makes it really easy to add new pages!
 */
function template_admin_prepare($page){
	global $conn; //Get $conn from database_connection.php
	include('configurations.php');
	include_once ($dir_admin_template.'/head.php');
	include_once ($dir_admin_template.'/navigation.php');
	include_once ($dir_admin_template.'/header.php');
	?>
	<body>
		<div id="content">	
	<?php 
	$page = $dir_admin_template_pages.$page.".php";
	if (file_exists($page)==true) {  //Checks if that page is available.
		include_once ($page); 
	}
	else {
		echo "<h1>Eror 404: Page not found.</h1>"; //And catches potential naughty hacker hehe ^_^
	}
	
	include_once ($dir_admin_template.'/footer.php');
}
?>