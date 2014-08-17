(function () {
  'use strict';

  angular
    .module('app')
    .directive('dynamic', dynamic);

    function dynamic ($compile) {
      return {
        restrict: 'A',
        replace: true,
        transclude: false,
        link: function (scope, ele, attrs) {
          scope.$watch(attrs.dynamic, function(html) {
            ele.html(html);

            //compile elements to DOM to make Soundcloud widget object
            $compile(ele.contents())(scope);

            if(document.querySelector('iframe')){
              var widget = SC.Widget(document.querySelector('iframe'));

              widget.bind(SC.Widget.Events.FINISH, function(){
                scope.sc.index++; //increment index to next in list
                scope.sc.showSong(scope.sc.index);
              });
            }

          });
        }
      };
      }

})();