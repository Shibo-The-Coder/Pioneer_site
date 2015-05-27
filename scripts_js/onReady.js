
function onReady() {

	if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
		// chrome stuff
	}

	$( "#searchInput" ).keypress(function(e) {
		clearTimeout( searchTimer );
		searchTimer = setTimeout( function() {
  			searchSite( $( "#searchInput" ).val() );
		}, 500);
	});

	//open current page
	var url = $( location ).attr( "href" );
	if ( url.indexOf('#') !== -1 ) {
		if ( url[ url.indexOf('#') + 1 ] == "1" ) {
			openPage( url.substring( url.indexOf("#") + 2 ) );
		} else if ( url[ url.indexOf('#') + 1 ] == "2" ) {
			openPost( url.substring( url.indexOf("#") + 2 ) );
		} else {
			searchSite( ( url.substring( url.indexOf("#") + 2) ).replace(/%20/g, " ") );
		}
	} else {
		openPage("home");
	}

	//make the page resposive to back/forward buttons
	setTimeout( function() {
		if ("onhashchange" in window) {
			$( window ).on( "hashchange", function() {
				url = $( location ).attr( "href" );
				openPage( url.substring( url.indexOf( "#" ) + 2 ), true );
			});
		}
	}, 10);

	setTimeout( function() {
		$( "#navCurrent" ).removeClass( "transparent" );
	}, 1000 );
}