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
            $compile(ele.contents())(scope);
            if(document.querySelector('iframe')){
              var widget = SC.Widget(document.querySelector('iframe'));
              console.log(widget);
              widget.bind(SC.Widget.Events.FINISH, function(){
                scope.sc.index++;
                console.log(scope.sc.index);
                scope.sc.showSong(scope.sc.index);
              });
              widget.bind(SC.Widget.Events.PAUSE, function(){
                console.log("PAUSEDDDD");
                console.log(scope);
              });
            }
          });
        }
      };
      }

})();