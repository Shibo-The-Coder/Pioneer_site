</body>
	<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src = "./scripts/clickFrunctions.js">//Controls when nav items are clicked</script>
	<script src = "./scripts/onReady.js">//Does a couple of things with the search bar and .transparent</script> 
	<script src = "./scripts/onResize.js">//Resizes images when window is resized</script>
	<script src = "./scripts/loadBlog.js"></script>
	<script src = "./scripts/scripts.js"></script>
	<script>
	$('#logo').hover(function(){
			$(this).attr('src','./style/images/pioneerHover.png');
		}, function(){
			$(this).attr('src','./style/images/pioneer.png');
		});

	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script>
</html>