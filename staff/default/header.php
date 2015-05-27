<?php 
/*
*Contains the header, logo and navigation bar.
*/
?>
<div id = "header">
	<a href="./" title="" ><img src="<?php echo $dir_template_images; ?>pioneer.png" id="logo" /> </a>
	

				<div id = "nav">
	<ul id = "navButtons">
		<li id = "navHome" class = "navItem"><a href="./index.php">Home</a></li>
		<li id = "navInfo" class = "navItem"><a href="./articles.php">Articles</a></li>
		<li id = "navContact" class = "navItem"><a href="./" onClick="return false;">Contact Us</a></li>
		<li id = "navBlog" class = "navItem"><a href="./?page=3" onClick="return false;">Members</a></li>	
		<li id = "navBlog" class = "navItem"><a href="./?page=4" onClick="return false;">FAQ</a></li>	
	</ul>
	</div>
</div>