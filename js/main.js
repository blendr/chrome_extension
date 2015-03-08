var sendDrafts = function() {
    var gmail = new Gmail();
    user_email = gmail.get.user_email();
    compose_ids = gmail.get.compose_ids();
    console.log(user_email);
    console.log(compose_ids);

    url = 'https://cahoots-email.herokuapp.com/draft/create'
    data = {
        user_email: user_email,
        draft_id: compose_ids[0]
    }

    $.post(url, data, function() {
        console.log(data);
    });

    // Open cahoots draft in new tab
    window.open('https://cahoots-email.herokuapp.com/', '_blank');
    
}

// Add cahoots link to elt. Elt should be the button toolbar at the bottom of a
// draft popup
var addLink = function(elt) {
    // console.log("number of links is " + $(elt).children('.cahoots-button').length);
    if (elt !== null && $(elt).children('.cahoots-button').length == 0) {
        // console.log("appending");
        $(elt).append(
            '<input type="button" class="cahoots-button" value="cahoots">'
        );
        $(elt).on('click', '.cahoots-button', function() {
            sendDrafts();
        });
    }
};

// Find all draft popup button toolbars and call addLink to all of them
var addLinkToElts = function() {
    // console.log('loopin\'');
    elements = $(".a8X.gU").children([style="-webkit-user-select: none;"]);

    if(elements.is(':visible')) {
        elements.each(function(i, elt) {
            console.log("calling addLink for elt " + i);
            addLink(elt);
        })
    }
};

var gmail;

// Wait until Gmail and JQuery are ready
function refresh(f) {
  if( (/in/.test(document.readyState)) ||
        (undefined === Gmail) ||
        (undefined === $)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){
    // NOTE: Always use the latest version of gmail.js from
    // https://github.com/KartikTalwar/gmail.js
    gmail = new Gmail();
    console.log('Hello from cahoots,', gmail.get.user_email());


    $(document).ready(function() {
        // If compose popups exist on load, append cahoots link
        var pathname = window.location.href;
        if (pathname.indexOf('compose') > 0){
            addLinkToElts();
        }

        // Add an event listener to add cahoot link to new draft popups.
        // XXX: There's a race condition here and we almost always miss the
        // latest draft
        var composeButton = $(".T-I.J-J5-Ji.T-I-KE.L3:contains('COMPOSE')").get(0);
        composeButton.addEventListener('click', function() {
            addLinkToElts();
        }, false);
        $(document).on('click', '.nr.tMHS5d', function() {
            addLinkToElts();
        });
    });
}

refresh(main);
