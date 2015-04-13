function loadBlog() {
	loadBlogNew = false;
	$.get( "./scripts/blog.php", 
		{ pageNum: loadedBlogPage }, 
		function( data ) {
			$( "#blogLoading" ).remove();
			$( "#blogPosts" ).append( data );
			loadedBlogPage++;
			loadBlogNew = true;
		}
	);
}