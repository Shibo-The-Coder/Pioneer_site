<?php 
/*
*Contains footer and scripts that go at the end of the page.
*/
?>



<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>
	$('#logo').hover(function(){
			$(this).attr('src','<?php echo $dir_template_images; ?>pioneerHover.png');
		}, function(){
			$(this).attr('src','<?php echo $dir_template_images ?>pioneer.png');
		});
</script>

</body>
</html>