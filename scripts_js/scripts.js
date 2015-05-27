var searchTimer;
var currentPost;
var currentPage;
var loadBlogNew = true;
var loadedBlogPage = 0;

$( document ).ready( function() {
	onReady();
	onResize();
	clickFunctions();
	loadBlog();

	today = new Date();
	$("#year").html( today.getFullYear() );
});

$( window ).resize( function() {
	onResize();
});

$( window ).scroll( function() {
	if( $( window ).scrollTop() + $( window ).height() > ( $( document ).height() - 50 ) ) {
		if ( loadBlogNew ) {
			loadBlog();
		}
	}
});

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

function onResize() {
	height = $( window ).height();
	width = $( window ).width();

	$( "#popupImg" ).css( "max-height", (height - 100) + "px" );
	setTimeout( function() {
		moveNavCurrent( currentPage );
	}, 100);
}

function searchSite( input ) {
	if (currentPage != "search") openPage("search", true);
	updateHash( input, "3" );
	$("#search").empty();
	$("#search").html( "<div class = 'searchResult'>Searching Pioneer for \"" 
	+ input.replace(/<\/?[^>]+(>|$)/g, "") + "\"...</div>" );
	$("#search").load( "./scripts/search.php?searchQuery=" 
	+ input.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s/g,"-") );
}

function submitForm() {

	var formTypeCap = "Message";
	var prefix = "form";

	var name = $( "." + prefix + "Name" ).val();
	var email = $( "." + prefix + "Email" ).val();
	var message = $( "." + prefix + formTypeCap ).val();

	if ( name == "" ) {
		alert( "Before we send this...", "It would be awesome if we could get your name!", "Ok" );
		return;
	}

	if ( email == "" ) {
		alert( "Before we send this...", "We can't reply if we don't have your email address!" );
		return;
	}

	if ( message == "" ) {
		alert( "Before we send this...", "You might want to say something first (:" );
		return;
	}

	alert("Sending...");

	$( "#send" + formTypeCap ).addClass( "disabledButton" );

    $.post( 
    	"./scripts/message.php",
        { name: name,
        email: email,
        message: message },
        function( data ) {
            alert( data, "", "Ok", closePopup );
            if ( data !== "Message failed! :(" ) {
		        $( "." + prefix + "Name" ).val("");
		        $( "." + prefix + "Email" ).val("");
		        $( "." + prefix + formTypeCap ).val("");
            }
			$( "#send" + formTypeCap ).removeClass( "disabledButton" );
        }
    );
}

function openPage( pageName, ignoreHash ) {
	currentPage = pageName;
	moveNavCurrent( pageName );

	if (!ignoreHash) updateHash( pageName, "1" );
	page = $("#" + pageName);
	pages = $(".page");
	pages.addClass( "transparent" );
	setTimeout( function() {
		pages.hide();
		page.show();
		setTimeout( function() {
			page.removeClass("transparent");
		}, 100);
	}, 500);
}

function openPost( filename ) {
	$( "#post" ).empty().load( "./blog/posts/" + filename + ".html" );
	openPage( "post", true );
	updateHash( filename, "2" );
	currentPost = filename;
}

function moveNavCurrent( pageName ) {
	pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
	if (pageName == "Post" ) pageName = "Blog";

	log(pageName);

	if ( pageName == "Hide" ) {
		navLeft = $( "#navCurrent" ).position().left;
		navTop = -50;
	} else {
		var position = $( "#nav" + pageName ).position();
		navLeft = position.left - 3;
		navTop = position.top - 3;
	}

	if ( navLeft == -3 && navTop == -3 ) {
		navLeft = -50;
		navTop = -50;
	}

	$( "#navCurrent" ).css( "transform", "translateX(" + navLeft + "px) translateY(" + navTop + "px)" );
	$( "#navCurrent" ).css( "-webkit-transform", "translateX(" + navLeft + "px) translateY(" + navTop + "px)" );

	setTimeout( function() {
		$( "#navCurrent" ).css( "transform", "translateX(" + navLeft + "px) translateY(" + navTop + "px)" );
		$( "#navCurrent" ).css( "-webkit-transform", "translateX(" + navLeft + "px) translateY(" + navTop + "px)" );
	}, 100);
}

function updateHash(filename, type) {
	$( window ).unbind( "hashchange" );
	location.hash = type + filename;

	setTimeout( function() {
		if ("onhashchange" in window) {
			$( window ).on( "hashchange", function() {
				url = $( location ).attr( "href" );
				if ( url[ url.indexOf('#') + 1 ] == "1" ) {
					openPage( url.substring( url.indexOf("#") + 2 ) );
				} else if ( url[ url.indexOf('#') + 1 ] == "2" ) {
					openPost( url.substring( url.indexOf("#") + 2 ) );
				} else {
					searchSite( ( url.substring( url.indexOf("#") + 2) ).replace(/%20/g, ' ') );
				}
			});
		}
	}, 10);
}

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

function alert( title, message, button, buttonFunction, showCancel ) {
	if ( showCancel ) {
		$( ".popupCancelButton" ).css( "display", "block" );
	} else {
		$( ".popupCancelButton" ).css( "display", "none" );
	}

	if ( message == undefined ) {
		message = "";
	} 

	if ( button == undefined ) {
		button = "Ok";
	}

	if ( buttonFunction == undefined ) {
		buttonFunction = closePopup;
	}

	$( ".popup" ).css( "display", "table" );
	$( ".popupTitle" ).html( title );
	$( ".popupText" ).html( message );
	$( ".popupButton" ).html( button );
	$( ".popupButton" ).unbind( "click" );
	$( ".popupButton" ).on( "click", buttonFunction );
	setTimeout( function() {
		$( ".popup" ).removeClass("transparent").addClass("opaque");
	}, 100);
}

function showImage( url ) {
	$( ".popupImage" ).css( "display", "table" );
	$( "#popupImg" ).attr("src", url);
	setTimeout( function() {
		$( ".popupImage" ).removeClass("transparent").addClass("opaque");
	}, 100);
}

function closePopup() {
	$( ".popup" ).addClass("transparent").removeClass("opaque");
	$( ".popupImage" ).addClass("transparent").removeClass("opaque");
	setTimeout( function() {
		$( ".popup" ).css( "display", "none" );
		$( ".popupImage" ).css( "display", "none" );
	}, 500);
}

$( document ).on("keydown", function(e) {
	keyCode = e.keyCode || e.which;

	if (keyCode == 13) {
		closePopup();
	}
});

function log(input) {
	console.log(input);
}