(function () {
	'use strict';

	angular
		.module('app')
		.controller('SoundcloudController', SoundcloudController);

	function SoundcloudController ($sce, SoundcloudService, NotificationService) {
		var vm = this;

		vm.list = [];
		vm.playlist = [];
		vm.API = 'a44cfa630acf25634739522063b81015'; // Your API Key
		vm.index = -1;
		vm.playlistIndex = -1;
		vm.loading = false;

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
	      }).error(function(data, status) {
	      	  vm.loading = false;
	          console.log('OKFALSE', status, data);
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
	      }).error(function(data, status) {
	      	  vm.loading = false;
	          console.log('OKFALSE', status, data);
	      });
		};

	    vm.search = function(){
	      vm.loading = true;

	      SoundcloudService.search( vm.ui, vm.API )
	      .success(function(data, status) {
	      	  vm.loading = false;
	      	  vm.index = -1; //reset search list index
      		  vm.list = data;
	      }).error(function(data, status) {
	      	  vm.loading = false;
	          console.log('OKFALSE', status, data);
	      });
	    };
	}
		
})();