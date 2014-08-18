(function () {
	'use strict';

	angular
		.module('app')
		.controller('SoundcloudController', SoundcloudController);

	function SoundcloudController ($sce, SoundcloudService) {
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
			if(index == vm.index){
				vm.index = -1; //reset list index
				vm.playlistIndex = vm.playlist.length - 1; //set playlist index to last item
			}
		};

		vm.removeFromPlaylist = function(index){
			vm.playlist.splice(index, 1);

			//reset playlist index if playing
			if(index == vm.playlistIndex){
				vm.playlistIndex = -1; 
			}
		};

		vm.showSong = function(index){
		  vm.index = index;
		  vm.playlistIndex = -1;
	      vm.loading = true;

		  SoundcloudService.embed( vm.list[index].permalink_url )
	      .success(function(data, status) {
	      	  vm.loading = false;
      		  vm.embedHtml = $sce.trustAsHtml(data.html);
	      }).error(function(data, status) {
	          vm.data = data || "Request failed";
	          vm.status = status;
	          console.log('OKFALSE', status, data);
	      });
		};

		vm.showSongPlaylist = function(index){
		  vm.playlistIndex = index;
	   	  vm.index = -1;
	      vm.loading = true;
	   	  
		  SoundcloudService.embed( vm.playlist[index].permalink_url )
	      .success(function(data, status) {
	      	  vm.loading = false;
      		  vm.embedHtml = $sce.trustAsHtml(data.html);
	      }).error(function(data, status) {
	      	  vm.loading = false;
	          vm.data = data || "Request failed";
	          vm.status = status;
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
	          vm.data = data || "Request failed";
	          vm.status = status;
	          console.log('OKFALSE', status, data);
	      });
	    };
	}
		
})();