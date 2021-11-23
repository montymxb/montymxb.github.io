/* IDEA FOR ICON FROM HERE -> http://dribbble.com/shots/1003867-Dribbble-Invitation?list=popular&offset=2 */

/* Trigger Animation */
$('a').on('click', function() {
    $('.container').addClass('is-active');
    $(this).remove();
});
