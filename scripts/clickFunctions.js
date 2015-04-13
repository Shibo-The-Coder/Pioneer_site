//Controls when nav items are clicked
function clickFunctions() {
	$(".navItem").on( "click", function() {
		openPage( $(this).attr("id").toLowerCase().substring(3) );
	});

	$( "body" ).on( "click", "img", function() {
		if ( $( this ).attr("id") == "popupImg" ) return;
		showImage( $( this ).attr("src") );
	});

	$( ".popupImage" ).on( "click", function() {
		closePopup();
	});

	$( "body" ).on( "click", ".postTitle", function() {
		if ( $( this ).parent().parent().attr("filename") ) {
			openPost( $( this ).parent().parent().attr("filename") );
		} else {
			openPost( $( this ).attr("filename") );
		}
	});

	$( "#sendMessage" ).on( "click", function( event ) {
		submitForm();
	});
}