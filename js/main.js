var SERVER_URL = 'https://cahoots-email.herokuapp.com/'

var sendDraftPost = function(user_email, draft_id) {
    url = SERVER_URL + 'draft/create'
    data = {
        user_email: user_email,
        draft_id: draft_id
    }

    $.post(url, data, function(response) {
        console.log("POST: " + url);
        console.log(data);
        console.log("RESPONSE:");
        console.log(response);
    });

    // Open cahoots draft in new tab
    window.open(SERVER_URL, '_blank');
}

var handleEmptyDraft = function() {

}

var sendDraft = function(button) {
    var gmail = new Gmail();
    user_email = gmail.get.user_email();
    draft_ids = gmail.get.compose_ids();

    compose_id = $(button).data('composeid');
    form = $('input[name="composeid"][value="'+ compose_id + '"]').parent();
    draft_id = $(form).find('input[name="draft"]').val();

    if (draft_id === 'undefined') {
        handleEmptyDraft();
    } else {
        sendDraftPost(user_email, draft_id);
    }
}

// Add cahoots link to elt. Elt should be the button toolbar at the bottom of a
// draft popup
var addLink = function(elt) {
    if (elt !== null && $(elt).children('.cahoots-button').length == 0) {
        form = $(elt).closest('.iN').prev().prev();

        compose_id = $(form).find('input[name="composeid"]').val();
        $(elt).append(
            '<input type="button" class="cahoots-button" value="cahoots" data-composeid=' + compose_id + '>'
        );
        $(elt).on('click', '.cahoots-button', function() {
            sendDraft(this);
        });
    }
};

// Find all draft popup button toolbars and call addLink to all of them
var addLinkToElts = function() {
    elements = $(".a8X.gU").children([style="-webkit-user-select: none;"]);

    if (elements.is(':visible')) {
        elements.each(function(i, elt) {
            addLink(elt);
        })
    }
};

var gmail;

// Wait until Gmail and JQuery are ready
function refresh(f) {
  if ((/in/.test(document.readyState)) ||
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
