$( document ).ready( function() {
    onClicks();

    today = new Date();
    $("#CMSMonth").val( numberToMonth( today.getMonth() + 1 ) );
    $("#CMSDay").val( today.getDate() );
    $("#CMSYear").val( today.getFullYear() );

    updateView();
});

function publishPost() {
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
    
    postContent = "<div class = \"postContent\">\n"
    + "\t" + '<span class = "postTitle">' 
    + $( "#CMSPostTitle" ).val() 
    + '</span> <span class = "postDate">' 
    + $("#CMSDay").val() + " " 
    + $("#CMSMonth").val() + " " 
    + $("#CMSYear").val() + '</span>'
    + '<div class = "postAuthor">' + $( "#CMSPostAuthor" ).val() + "</div>"
    + '<br><!-- content -->' 
    + getEditorText() 
    + '<!-- /content -->' + "\n"
    + "\t<div class = \"postFooter\">\n"
    + "\t\t<div class = \"postFooterLast\"></div>\n" 
    + "\t\t<div class = \"postFooterNext\"></div>\n"
    + "\t\t<div class = \"postFooterList\"></div>\n"
    + "\t</div>\n"
    + "</div>\n"
    + "<!--tags " + postTags + " /tags-->";

    $.post( 
        "./secureScripts/createPost.php",
        { postTitle: postTitle,
        postDate: postDate,
        postAuthor: postAuthor,
        postTags: postTags,
        postContent: postContent,
        authToken: "xJe9b4Yk2pz!>;" },
        function(data) {
            var url = "http:/thepioneer.gatech.edu/edit/editPost.html";
            $( location ).attr('href', url);
        }
    );
}

function updateView() {
    $( "#CMSPreview" ).html( '<span class = "postTitle">' 
    + $( "#CMSPostTitle" ).val() 
    + '</span> <span class = "postDate">' 
    + $("#CMSDay").val() + " " 
    + $("#CMSMonth").val() + " " 
    + $("#CMSYear").val() + '</span>'
    + '<div class = "postAuthor">' + $( "#CMSPostAuthor" ).val() + "</div>"
    + '<br><!-- content -->' 
    + getEditorText() 
    + '<!-- /content -->'
);}

function onClicks() {
    $("#CMSNewPublish").on("click", function() {
        publishPost();
    });

    $("#CMSUpdate").on( "click", function() {
        updateView();
    });
}

function numberToMonth( number ) {
    switch( number ) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "January";
    }
}