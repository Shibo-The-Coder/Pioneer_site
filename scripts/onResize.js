//Resizes images when window is resized
function onResize() {
	height = $( window ).height();
	width = $( window ).width();

	$( "#popupImg" ).css( "max-height", (height - 100) + "px" );
	setTimeout( function() {
		moveNavCurrent( currentPage );
	}, 100);
}