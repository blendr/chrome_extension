// Add cahoots link to elt. Elt should be the button toolbar at the bottom of a
// draft popup
var addLink = function(elt) {
    // console.log("number of links is " + $(elt).children('.cahoots-button').length);

    if (elt !== null && $(elt).children('.cahoots-button').length == 0) {
        // console.log("appending");
        $(elt).append(
            '<div class="cahoots-button"><a href=\"http://cahoots.email\">cahoots!</a></div>'
        );
    }
};

// Find all draft popup button toolbars and call addLink to all of them
function addLinkToElts() {
    // console.log('loopin\'');
    elements = $(".a8X.gU").children([style="-webkit-user-select: none;"]);

    if(elements.is(':visible')) {
        elements.each(function(i, elt) {
            // console.log("calling addLink for elt " + i);
            addLink(elt);
        })
    }
};

$(document).ready(function() {
    // If compose popups exist on load, append cahoots link
    var pathname = window.location.href;
    if (pathname.indexOf('compose') > 0){
        addLinkToElts();
    }

    // Add an event listener to add cahoot link to new draft popups.
    // XXX: There's a race condition here and we almost always miss the latest
    // draft
    var composeButton = $(".T-I.J-J5-Ji.T-I-KE.L3:contains('COMPOSE')").get(0);
    composeButton.addEventListener('click', function() {
        addLinkToElts();
    }, false);
});
