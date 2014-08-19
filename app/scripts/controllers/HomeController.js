(function () {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	function HomeController () {
		this.title = 'Cory';
	}
				
})();