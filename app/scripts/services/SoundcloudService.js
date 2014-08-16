(function () {
	'use strict';

	angular
		.module('app')
		.service('SoundcloudService', SoundcloudService);


	function SoundcloudService ($http) {
		var vm = this;

	    vm.embed = function( trackUrl ) {
		  vm.trackUrl = trackUrl;
	      vm.url = 'http://api.soundcloud.com/oembed?format=json&url=' + vm.trackUrl + '&maxheight=200';

	      return $http( { method: 'GET', url: vm.url });
	    };

	    vm.search = function( q, apiKey ) {
		  vm.apiKey = apiKey;
	      vm.query = q;
	      vm.url = 'http://api.soundcloud.com/tracks.json?q='+ vm.query + '&client_id=' + vm.apiKey;

	      return $http( { method: 'GET', url: vm.url });
	    };
	}
	
})();