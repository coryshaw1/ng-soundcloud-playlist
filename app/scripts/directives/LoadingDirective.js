(function () {
  'use strict';

  angular
    .module('app')
    .directive('loading', loading);

    function loading () {
      return {
          restrict: 'E',
          replace: true,
          template: '<div class="spinner">' + 
                      '<div class="rect1"></div>&nbsp;' + 
                      '<div class="rect2"></div>&nbsp;' + 
                      '<div class="rect3"></div>&nbsp;' + 
                      '<div class="rect4"></div>&nbsp;' + 
                      '<div class="rect5"></div>&nbsp;' + 
                    '</div>',
          link: function (scope, element, attr) {
              scope.$watch(attr.var, function (val) {
                  if (val){
                    element.css('display', 'block');
                  }
                  else{
                    element.css('display', 'none');
                  }
                      
              });
          }
      };
    }

})();