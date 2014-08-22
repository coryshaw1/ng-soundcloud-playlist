(function () {
	'use strict';

	angular
		.module('app')
		.service('SoundcloudService', SoundcloudService);


	function SoundcloudService ($http) {
		var vm = this;

	    vm.embed = function( trackUrl ) {
		  vm.trackUrl = trackUrl;
	      vm.url = 'http://api.soundcloud.com/oembed?format=json&url=' + vm.trackUrl + '&auto_play=true&maxheight=200';

	      return $http.get(vm.url);
	    };

	    vm.search = function( q, apiKey ) {
		  vm.apiKey = apiKey;
	      vm.query = q;
	      vm.url = 'http://api.soundcloud.com/tracks.json?q='+ vm.query + '&client_id=' + vm.apiKey;

	      return $http.get(vm.url);
	    };

	    vm.track = function( trackId, apiKey ){
		  vm.apiKey = apiKey;
	      vm.trackId = trackId;
	      vm.url = 'http://api.soundcloud.com/tracks/'+ vm.trackId + '.json?client_id=' + vm.apiKey;

	      return $http.get(vm.url);
	    };
	}
	
})();