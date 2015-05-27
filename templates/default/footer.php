<?php 
/*
*Contains footer and scripts that go at the end of the page.
*/
?>
<div id="fb-root"></div>
	<div id="fbbig">
		<div class="fb-page" data-href="https://www.facebook.com/gtpioneer?fref=ts" data-width="100%" data-height="300" data-hide-cover="false" data-show-facepile="true" data-show-posts="true"></div>
	</div>
	
<div id = "footer">
	Copyright &copy; 2014-<span id = "year"></span> Pioneer Magazine. Website by <a href = "https://joshua.diaddigo.com/" title="Visit Joshua's Website">Joshua Diaddigo</a> and <a href="http://www.prism.gatech.edu/~sattia6/" title="Visit Shehab's Website">Shehab Attia</a>.
</div>


<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>
	$('#logo').hover(function(){
			$(this).attr('src','<?php echo $dir_template_images; ?>pioneerHover.png');
		}, function(){
			$(this).attr('src','<?php echo $dir_template_images ?>pioneer.png');
		});

	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>

</body>
</html>