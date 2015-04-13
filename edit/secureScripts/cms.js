var middlePercent = 0.5;
var editor;

$( document ).ready( function() {
    editor = CodeMirror.fromTextArea(document.getElementById("CMSHtmlTextArea"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    });
    editor.setOption("theme", "base16-dark");

    onFuncsCMS();
    onResizeFuncs();
});

$( window ).resize( function() {
    onResizeFuncs();
});

function onFuncsCMS() {
    $("#CMSUpdate").on( "click", function() {
        updateView();
    });

    $("#CMSInsertImage").on( "click", function() {
        HTMLcreateImage();
        updateView();
    });

    $( "body" ).on( "click", "#uploadSend", function() {
        uploadFile();
    });

    $( "#CMSLink" ).on( "click", function() {
        HTMLcreateLink();
        if ( getEditorSelection() !== "" ) $( "#linkText" ).val( getEditorSelection() );
        updateView();
    });

    $( ".popupCancelButton" ).on( "click", function() {
        closePopup();
    });

    $( "#CMSEdit" ).on( "paste", function(e) {
        e.preventDefault();
        var data = e.originalEvent.clipboardData.getData('Text');
        insertEditorText( data );
        updateView();
    });

    $( ".selectContainer" ).on( "click", function() {
        $( this ).children().first().trigger( "mousedown" );
    });

    $( "#CMSAlignRight" ).on( "click", function() {
        wrapEditorSelection( "<div class = \"alignRight\">", "</div>" );
        updateView();
    });

    $( "#CMSAlignCenter" ).on( "click", function() {
        wrapEditorSelection( "<div class = \"alignCenter\">", "</div>" );
        updateView();
    });

    $("#CMSQuote").on( "click", function() {
        HTMLcreateQuote();
        if ( getEditorSelection() !== "" ) $( "#quoteText" ).val( getEditorSelection() );
        updateView();
    });

    $("#CMSColor").on( "click", function() {
        HTMLcolor();
        updateView();
    });

    $("#CMSSize").on( "click", function() {
        HTMLsize();
        updateView();
    });
}

function onResizeFuncs() {
    $( "#CMSMove" ).css( "-webkit-transform", "translateY(" + (($( window ).height() * middlePercent) - 2) + "px)");
    $( "#CMSMove" ).css( "transform", "translateY(" + (($( window ).height() * middlePercent) - 2) + "px)");
}

function log(input) {
    console.log(input);
}

function setEditorText( text ) {
    if (editor) editor.setValue( text );
}

function getEditorText() {
    if (editor) return editor.getValue();
}

function getEditorSelection() {
    if (editor) return editor.getSelection();
}

function insertEditorText( text ) {
    if (editor) editor.replaceSelection( text );
}

function wrapEditorSelection( begin, cap ) {
    if (editor) editor.replaceSelection( begin + editor.getSelection() + cap );
}

function alert( title, message, button, buttonFunction, showCancel ) {

    if ( showCancel ) {
        $( ".popupCancelButton" ).css( "display", "inline-block" );
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
        $( ".editContent" ).css( "-webkit-filter", "blur(50px)" );
        $( ".popup" ).removeClass("transparent").addClass("opaque");
    }, 100);
}

function HTMLcreateImage() {
    alert( "Insert Image", 
    "<input id = \"imageInput\" type=\"text\" placeholder = \"image\"/> "
    + "<input size = \"2\" id = \"imageWidth\" type=\"text\" placeholder = \"%\"/><br>"
    + "<input id = \"imageCaption\" type=\"text\" placeholder = \"caption\"/><br> "
    + "<input type = \"radio\" name = \"imgPos\" innerText=\"display: inline; float: left;\"> float left<br>"
    + "<input type = \"radio\" name = \"imgPos\" innerText=\"display: block; margin-left: auto; margin-right: auto;\" checked> center block<br>"
    + "<input type = \"radio\" name = \"imgPos\" innerText=\"display: inline; float: right;\"> float right<br>"
    + "<input id = \"uploadFile\" type = \"file\"/>"
    + "<div class = \"button\" id = \"uploadSend\">Upload</div><br/>"
    + "<div class = \"progressOuter\">"
    + "<div class = \"progressInner\" id = \"uploadProgress\"></div>"
    + "</div>", 
    "Insert", function() {
        if ( $( "#imageWidth" ).val() == "" ) {
            width = "50%"
        } else {
            width = $( "#imageWidth" ).val() + "%";
        }

        if ( $( "#imageCaption" ).val() != "" ) {
            figcaption = "<figcaption>" + $( "#imageCaption" ).val() + "</figcaption>";
        } else {
            figcaption = "";
        }

        insertEditorText( "<figure style = \"max-width: " + width + "; " + $("input[name=imgPos]:checked").attr( "innerText" ) + "\">\n"
        + "\t<img src = \"http://thepioneer.gatech.edu/blog/images/" + $( "#imageInput" ).val() + "\">\n" 
        + figcaption
        + "</figure>");
        closePopup();
        updateView();
    }, true);
}

function uploadFile() {
    var fileInput = document.getElementById( "uploadFile" );
    var file = fileInput.files[0];

    if (!file) {
        alert( "Please select a file" );
        return;
    }

    $( ".progressOuter" ).css( "opacity", "1" );

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener( "progress", onprogressHandler, false );
    xhr.open( "POST", "./secureScripts/uploadFile.php", true );
    xhr.setRequestHeader( "X-File-Name", file.name );
    xhr.setRequestHeader( "Content-Type", "application/octet-stream" );
    xhr.send( file );

    xhr.onreadystatechange = function( data ) {
        $( "#imageInput" ).val( xhr.responseText );
        $( "#uploadProgress" ).css( "width", 0 + "%" );
        $( ".progressOuter" ).css( "opacity", "0" );
    }

    function onprogressHandler( event ) {
        var percent = event.loaded/event.total*100;
        $( "#uploadProgress" ).css( "width", percent + "%" );
    }
}

function HTMLcreateLink() {
    alert( "Insert Link", 
    "<input id = \"linkUrl\" type=\"text\" placeholder = \"url\"/> <br>"
    + "<input id = \"linkText\" type=\"text\" placeholder = \"text\"/>", 
    "Insert", function() {
        insertEditorText( "<a href = \""
        + $( "#linkUrl" ).val() 
        + "\">" 
        + $( "#linkText" ).val()
        + "</a>\n" );
        closePopup();
        updateView();
    }, true);
}

function HTMLcreateQuote() {
    alert( "Insert Quote", 
    "<input id = \"quoteAuthor\" type=\"text\" placeholder = \"author\"/>"
    + "<textarea id = \"quoteText\" type=\"text\" placeholder = \"quote\"></textarea><br><br>", 
    "Insert", function() {
        insertEditorText( "<div class = \"quote\">"
        + "<div class = \"quoteText\">\""
        + $( "#quoteText" ).val() 
        + "\"</div><div class = \"quoteAuthor\">" 
        + $( "#quoteAuthor" ).val()
        + "</div></div>\n" );
        closePopup();
        updateView();
    }, true);
}

function HTMLcolor() {
    alert( "Edit Color", 
    "<input type = \"radio\" name = \"colorSelect\" innerText=\"blue\"> <span class = \"blue\">blue</span><br>"
    + "<input type = \"radio\" name = \"colorSelect\" innerText=\"darkBlue\"> <span class = \"darkBlue\">bold dark blue</span><br>"
    + "<input type = \"radio\" name = \"colorSelect\" innerText=\"gray\"> <span class = \"gray\">gray</span>", 
    "Change", function() {
        wrapEditorSelection( "<span class = \"" + $("input[name=colorSelect]:checked").attr( "innerText" ) + "\">", "</span>" );
        closePopup();
        updateView();
    }, true);
}

function HTMLsize() {
    alert( "Edit Font Size", 
    "<input id = \"fontSize\" type=\"text\" placeholder = \"size\" size = \"4\"/>px<br>", 
    "Change", function() {
        wrapEditorSelection( "<span style = \"font-size: " + $( "#fontSize" ).val() + "\">", "</span>" );
        closePopup();
        updateView();
    }, true);
}

function closePopup() {
    $( ".popup" ).addClass("transparent").removeClass("opaque");
    $( ".editContent" ).css( "-webkit-filter", "blur(0px)" );
    setTimeout( function() {
        $( ".popup" ).css( "display", "none" );
        $( ".editContent" ).css( "-webkit-filter", "blur(0px)" );
    }, 500);
}

$( document ).on("keydown", "#CMSHtmlTextArea", function(e) {
    keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        start = $(this).get(0).selectionStart;
        end = $(this).get(0).selectionEnd;

        $( "#CMSHtmlTextArea" ).insertAtCursor("    ");
    }
});

$( document ).on("keydown", function(e) {
    keyCode = e.keyCode || e.which;

    if (keyCode == 13) {
        closePopup();
    }
});

$( "#CMSMove" ).on( "mousedown", function(e) {
    e.preventDefault();
    $( window ).on( "mousemove", function(e) {
        $( "#CMSMove" ).css( "-webkit-transform", "translateY(" + (e.pageY - 2) + "px)");
        $( "#CMSMove" ).css( "transform", "translateY(" + (e.pageY - 2) + "px)");
        middlePercent = (e.pageY / $( window ).height());
        $( "#CMSPreview" ).css( "height", (100 - (middlePercent * 100)) + "%" );
        $( "#CMSEdit" ).css( "height", (middlePercent * 100) + "%" );
    });
    $( window ).on( "mouseup", function() {
        $( window ).off( "mousemove" );
        $( window ).off( "mouseup" );
    });
});

jQuery.fn.extend({
    insertAtCaret: function(myValue){
        return this.each(function(i) {
            if (document.selection) {
                //For browsers like Internet Explorer
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == '0') {
                //For browsers like Firefox and Webkit based
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});

var openSelect = function( selector ) {
    var element = $(selector)[0], worked = false;
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent( "mousedown" , true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        worked = element.dispatchEvent(e);
    } else if (element.fireEvent) {
        worked = element.fireEvent( "onmousedown" );
    }
    if ( !worked ) {
        log( "Open select error" );
    }   
}
