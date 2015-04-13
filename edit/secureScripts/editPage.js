$( document ).ready( function() {
    onFuncs();
    updateView();
});

function loadPage( pageName, overrideDiv ) {
    $.ajax({
        url: "./secureScripts/getPages.php",
        dataType: 'html',
        success: function(html) {
            var content = ($('#' + pageName, $(html)).html());
            setEditorText( content );
            updateView();
        }
    });
}

function publishPage( pageName ) {
    updateView();
    $.ajax({
        url: "./secureScripts/getPages.php",
        dataType: 'html',
        success: function(html) {
            index = html.search("<div class = \"page transparent\" id = \"" + pageName + "\">");
            start = html.substring( 0, index ) + "<div class = \"page transparent\" id = \"" + pageName + "\">";
            end = html.substring( html.search("<!-- end " + pageName + " -->") );
            content = start + getEditorText() + "</div>" + end;
            $.post( 
                "./secureScripts/savePage.php",
                { content: content,
                authToken: "xJe9b4Yk2pz!>;" },
                function(data) {
                    var url = "http:/thepioneer.gatech.edu/edit/";
                    $( location ).attr('href', url);
                }
            );
        }
    });
}

function publishSidebar() {
    updateView();
    $.ajax({
        url: "./secureScripts/getPages.php",
        dataType: 'html',
        success: function(html) {
            index = html.search("<div id = \"blogSidebar\">");
            start = html.substring( 0, index ) + "<div id = \"blogSidebar\">";
            end = html.substring( html.search("<!-- end sidebar -->") );
            content = start + getEditorText() + "</div>" + end;
            $.post( 
                "./secureScripts/savePage.php",
                { content: content,
                authToken: "xJe9b4Yk2pz!>;" },
                function(data) {
                    var url = "http:/thepioneer.gatech.edu/edit/";
                    $( location ).attr('href', url);
                }
            );
        }
    });
}

function onFuncs() {
    $("#CMSEditPage").on( "click", function() {

        if ( $("#CMSSelectPage").val() == "blogSidebar" ) {
            publishSidebar();
        } else {
            publishPage( $("#CMSSelectPage").val() );
        }

    });

    $("#CMSSelectPage").on( "change", function() {
        loadPage( $("#CMSSelectPage").val() );

        setTimeout( function() {
            updateView();
        }, 100);
    });
}


function updateView() {
    $( "#CMSPreview" ).html( getEditorText() );
}