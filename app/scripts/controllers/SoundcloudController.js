(function () {
	'use strict';

	angular
		.module('app')
		.controller('SoundcloudController', SoundcloudController);


	function SoundcloudController ($location, $sce, SoundcloudService, NotificationService) {
		var vm = this;

		vm.list = [];
		vm.playlist = [];
		vm.API = 'a44cfa630acf25634739522063b81015'; // Your API Key
		vm.index = -1;
		vm.playlistIndex = -1;
		vm.loading = false;

		//check for query string on controller load
		if($location.search().q){
			var ids = atob($location.search().q).split(';');
			for(var i = 0; i < ids.length; i++){
				if(ids[i].length > 0){
					SoundcloudService.track(ids[i], vm.API)
					.success(function(data, status){
						vm.playlist.push(data);
					})
					.error(function(data, status){
						console.log(data);
						console.log('Invalid share id!');
						vm.playlist = []; //empty playlist
						return false;
					});
				}
			}
		}

		vm.addToPlaylist = function(index){
			vm.playlist.push(vm.list[index]);
			vm.list.splice(index, 1);

			//set playlist index if playing
			if(index === vm.index){
				vm.index = -1; //reset list index
				vm.playlistIndex = vm.playlist.length - 1; //set playlist index to last item
			}
		};

		vm.removeFromPlaylist = function(index){
			vm.playlist.splice(index, 1);

			//reset playlist index if playing
			if(index === vm.playlistIndex){
				vm.playlistIndex = -1; 
			}
		};

		vm.sharePlaylist = function(){
			var shareHash = '';
			for(var i = 0; i < vm.playlist.length; i++){
				/*jshint camelcase: false */
      	  		shareHash += vm.playlist[i].id;
      	  		if(i !== vm.playlist.length - 1){
      	  			shareHash += ';';
      	  		}
			}
			shareHash = btoa(shareHash);

			//TODO: make modal with share url here
			confirm(shareHash);
		};

		vm.showSong = function(index){
		  vm.index = index;
		  vm.playlistIndex = -1;
	      vm.loading = true;
	      var notificationTitle = vm.list[index].user.username + '\n' + vm.list[index].title;

		  /*jshint camelcase: false */
      	  NotificationService.fire(notificationTitle, vm.list[index].artwork_url);

		  /*jshint camelcase: false */
		  SoundcloudService.embed( vm.list[index].permalink_url )
	      .success(function(data, status) {
	      	  vm.loading = false;
      		  vm.embedHtml = $sce.trustAsHtml(data.html);
	      }).error(function(data, status, headers, config) {
	      	  vm.loading = false;
	      	  var configText = function(){
	      	  	var output = '';
	      	  	for (var property in config) {
	      	  		if(property){
				    	output += property + ': ' + config[property].toString()+'\n ';
	      	  		}
				}
				return output;
	      	  };
	      	  var headersText = function(){
	      	  	var output = '';
	      	  	for (var property in headers) {
	      	  		if(property){
	      	  			output += property + ': ' + headers[property].toString()+'\n ';	
	      	  		}
				}
				return output;
	      	  };
	          console.log('Status:', status,
	          				'\nData:', data, 
	          				'\nHeaders:', headersText(), 
	          				'\nConfig:', configText());
	      });
		};

		vm.showSongPlaylist = function(index){
		  vm.playlistIndex = index;
	   	  vm.index = -1;
	      vm.loading = true;
	      var notificationTitle = vm.playlist[index].user.username + '\n' + vm.playlist[index].title;

		  /*jshint camelcase: false */
      	  NotificationService.fire(notificationTitle, vm.playlist[index].artwork_url);

		  /*jshint camelcase: false */
		  SoundcloudService.embed( vm.playlist[index].permalink_url )
	      .success(function(data, status) {
	      	  vm.loading = false;
      		  vm.embedHtml = $sce.trustAsHtml(data.html);
	      }).error(function(data, status, config, statusText) {
	      	  vm.loading = false;
	          console.log('Show Song Playlist Error:', status, data, config, statusText);
	      });
		};

	    vm.search = function(){
	      vm.loading = true;

	      SoundcloudService.search( vm.ui, vm.API )
	      .success(function(data, status) {
	      	  vm.loading = false;
	      	  vm.index = -1; //reset search list index
      		  vm.list = data;
	      }).error(function(data, status, headers, config, statusText) {
	      	  vm.loading = false;
	          console.log('Search Error:', status, data, headers, config, statusText);
	      });
	    };
	}
		
})();