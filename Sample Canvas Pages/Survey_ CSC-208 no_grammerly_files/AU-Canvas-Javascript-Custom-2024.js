"use strict";

(function () {
	window.SENSUS_CFG = {
		ltiDomain: 'https://inside.sensusaccess.com/',

		clientId: '124330000000000231',
		consumerKey: 'b6d9f6a8-2846-4d0b-9305-08dbffee8acb'
	}

	$('<script>').attr('src', SENSUS_CFG.ltiDomain + 'js/canvasui/sensus-main.js').appendTo('body')
})()

// JavaScript Document
$(document).ready(function(){
// Checks the page to make sure it is course settings
if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
// Checks that current user role is not an admin to hide/disable options. Admins can access all settings.
if($.inArray('admin',ENV.current_user_roles) == -1){
// Hides course delete button
$('a[href*=\'confirm_action?event=delete\']').hide();
// Hides course reset button
//$('a[href*=\'/reset\']').hide();
}
}

});
