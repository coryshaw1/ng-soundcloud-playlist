(function (){
	'use strict';

	angular
		.module('app')
		.service('NotificationService', NotificationService);

	function NotificationService($timeout){
		var vm = this;
		vm.fire = function (message, icon) {
			var options = {
			    		title: 'Now playing', 
			    		body: message, 
			    		icon: icon,
			    		tag: 'testing'
		    		};

			// If the user agreed to get notified fire it
			if (window.Notification && window.Notification.permission === 'granted') {
			    var n = new Notification('Now playing...', options); //fire it
			    n.onshow = function () {
					$timeout(n.close, 3000); //Doesn't work in Chrome?
				};
			}

			// If the user hasn't told if he wants to be notified or not
			// Note: because of Chrome, we are not sure the permission property
			// is set, therefore it's unsafe to check for the "default" value.
			else if (window.Notification && Notification.permission !== 'denied') {
			  Notification.requestPermission(function (status) {
			    if (Notification.permission !== status) {
			      Notification.permission = status;

			      // If the user agreed to get notified fire it
			      if(status === 'granted'){
				    var n = new Notification('Now playing...', options); //fire it
				    n.onshow = function () { 
				  		$timeout(n.close, 3000);  //Doesn't work in Chrome?
					};
			      }

			    }
			  });
			}

		};	
	}
	
})();