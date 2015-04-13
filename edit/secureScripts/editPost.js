$( document ).ready( function() {
    onReady();
});

function onReady() {
    $( "#selectPost" ).load( "./secureScripts/getPosts.php", function() {
        loadPost( $( "#selectPost" ).val() );
    });

    $( "#selectPost" ).on( "change", function() {
        loadPost( $( "#selectPost" ).val() );
    });

    $( "#CMSEditDelete" ).on( "click", function() {
        alert( "Ah!", "Are you sure you want to delete this post?", "Yes", function() {
            deletePost( $( "#selectPost" ).val() );
            closePopup();
        }, true);
    });

    $( "#CMSEditPost" ).on( "click", function() {
        savePost( $( "#selectPost" ).val() );
    });
}

function loadPost( info ) {
    info = info.split("\|");
    filename = info[0];
    author = info[1];

    $.ajax({
        url: "../blog/posts/" + filename + ".html",
        dataType: 'html',
        success: function(html) {
            title = ($( ".postTitle", $(html)).html());
            date = ($( ".postDate", $(html)).html()).split( " " );
            tags = html.substring((html.search("<!--tags") + 8), (html.search("/tags-->"))).trim().split(" ");
            content = html.substring((html.search("<!-- content -->") + 16), (html.search("<!-- /content -->"))).trim();
            
            $( "#CMSPostTitle" ).val( title );
            $( "#CMSDay" ).val( date[0] );
            $( "#CMSMonth" ).val( date[1] );
            $( "#CMSYear" ).val( date[2] );
            $( "#CMSPostAuthor" ).val( author );

            $( "#CMSPostCategories" ).val( "" );
            $( "#CMSPostTags" ).val( "" );

            for ( var i = 0; i < tags.length; i++ ) {
                if ( tags[i].substring(0, 3) == "CAT" ) {
                    $( "#CMSPostCategories" ).val( $( "#CMSPostCategories" ).val() + " " + tags[i].substring( 3 ) );
                } else {
                    $( "#CMSPostTags" ).val( $( "#CMSPostTags" ).val() + " " + tags[i] );
                }
            }

            $( "#CMSPostCategories" ).val( $( "#CMSPostCategories" ).val().trim() );
            $( "#CMSPostTags" ).val( $( "#CMSPostTags" ).val().trim() );

            setEditorText( content );

            updateView();
        }
    });
}

function savePost( info ) {
    info = info.split("\|");
    filename = info[0];
    author = info[1];

    updateView();

    postTitle = $("#CMSPostTitle").val();
    postDate = $("#CMSDay").val() + " " + $("#CMSMonth").val() + " " + $("#CMSYear").val();
    postAuthor = $("#CMSPostAuthor").val();

    if ( !postTitle ) {
        alert( "Please enter a post title." );
        return;
    }

    if ( !postAuthor ) {
        alert( "Please enter an author." );
        return;
    }

    postCategories = ( $("#CMSPostCategories").val() ) ? "CAT" : ""; 

    if ($("#CMSPostCategories").val().trim().split(" ").length == 1
    && $("#CMSPostCategories").val() ) {
        postCategories = "CAT" + $("#CMSPostCategories").val().trim();
    } else {
        postCategories += $("#CMSPostCategories").val().trim().split(" ").join( " CAT" ); 
    }

    postTags = $("#CMSPostTags").val().trim() + " " + postCategories.trim();
    
    log( "tags: " + $("#CMSPostTags").val() );
    log( "cats: " + $("#CMSPostCategories").val() );
    log( "postTags: " + postTags );

    postContent = "<div class = \"postContent\">\n\t"
    + '<span class = "postTitle">' + $( "#CMSPostTitle" ).val() + "</span>"
    + '<span class = "postDate">' + $("#CMSDay").val() + " " + $("#CMSMonth").val() + " " + $("#CMSYear").val() + '</span>'
    + '<div class = "postAuthor">' + $( "#CMSPostAuthor" ).val() + "</div>"
    + '<br><!-- content -->' 
    + getEditorText()
    + '<!-- /content -->'
    + "\n\t<div class = \"postFooter\">\n"
    + "\t\t<div class = \"postFooterLast\"></div>\n"
    + "\t\t<div class = \"postFooterNext\"></div>\n"
    + "\t\t<div class = \"postFooterList\"></div>\n"
    + "\t</div>\n"
    + "</div>\n"
    + "<!--tags " + postTags + " /tags-->";

    $.post( 
        "./secureScripts/editPost.php",
        { postTitle: postTitle,
        postDate: postDate,
        postAuthor: postAuthor,
        postTags: postTags,
        postContent: postContent,
        postFilename: filename,
        authToken: "xJe9b4Yk2pz!>;" },
        function( response ) {
            alert( response );    
            var url = "http:/thepioneer.gatech.edu/edit/";
            $( location ).attr('href', url);
        }
    );
}

function deletePost( info ) {
    info = info.split("\|");
    filename = info[0];

    alert("Deleting...");

    $.post( 
        "./secureScripts/deletePost.php",
        { filename: filename,
        authToken: "xJe9b4Yk2pz!>;" },
        function(data) {
            onReady();
        }
    );
}

function updateView() {
    $( "#CMSPreview" ).html( '<span class = "postTitle">' 
    + $( "#CMSPostTitle" ).val() + '</span> <span class = "postDate">' 
    + $("#CMSDay").val() + " " + $("#CMSMonth").val() + " " + $("#CMSYear").val() + '</span>'
    + '<div class = "postAuthor">' + $( "#CMSPostAuthor" ).val() + "</div>"
    + '<br><!-- content -->' 
    + getEditorText()
    + '<!-- /content -->');
}