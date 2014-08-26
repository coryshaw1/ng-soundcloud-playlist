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
            
            //compile elements to DOM to make Soundcloud widget object
            $compile(html)(scope);

            if(document.querySelector('iframe')){
              var widget = SC.Widget(document.querySelector('iframe'));

              widget.bind(SC.Widget.Events.FINISH, function(){

                if(scope.sc.index !== -1){

                  //Currently playing from search list
                  //check if playing last song of search list
                  if(scope.sc.index < scope.sc.list.length - 1){

                    //Currently playing search list index is not last
                    scope.sc.index++;
                    scope.sc.showSong(scope.sc.index);

                  }
                  else{
                    scope.sc.index = -1; //reset search list index
                  }

                }
                else{

                  //Currently playing from playlist
                  //check if playing last song of playlist
                  if(scope.sc.playlistIndex < scope.sc.playlist.length - 1){

                    //Currently playing playlist index is not last
                    scope.sc.playlistIndex++;
                    scope.sc.showSongPlaylist(scope.sc.playlistIndex);

                  }
                  else{
                    scope.sc.playlistIndex = -1; //reset playlist index

                    //Start playing search list if there are results
                    if(scope.sc.list.length > 0){
                      scope.sc.index = 0;
                      scope.sc.showSong(scope.sc.index);
                    }

                  }//end if/else last song of playlist

                }//end if/else current playlst
                
              });
            }

          });
        }
      };
      }

})();