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

		vm.addToPlaylist = function(index){
			vm.playlist.push(vm.list[index]);
			vm.list.splice(index, 1);
		};

		vm.removeFromPlaylist = function(index){
			vm.playlist.splice(index, 1);
		};

		vm.showSong = function(index){
		  SoundcloudService.embed( vm.list[index].permalink_url )
	      .success(function(data, status) {
	      	console.log(data);
      		  vm.embedHtml = $sce.trustAsHtml(data.html);;
	      }).error(function(data, status) {

	          vm.data = data || "Request failed";
	          vm.status = status;
	          console.log('OKFALSE', status, data);

	      });
		};

	    vm.search = function(){
	      SoundcloudService.search( vm.ui, vm.API )
	      .success(function(data, status) {
      		  vm.list = data;

	      }).error(function(data, status) {

	          vm.data = data || "Request failed";
	          vm.status = status;
	          console.log('OKFALSE', status, data);

	      });
	    };
	}
		
})();