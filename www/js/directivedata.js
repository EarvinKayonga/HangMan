(function() {
  'use strict';

  angular.module('starter.directivedata', ['ionic', 'ngCordova']).directive('hangmanData', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: "templates/directive/hangmandata.html",
      scope: {
        word: '=',
        found: '=',
        isfinished: '='
      },
      link: function(scope, elem, attrs) {
        scope.$watch('word', function(newval, oldval) {
          scope.letters = [];
          if (scope.word && (scope.word != undefined)) {
            var first = scope.word.charAt(0);
            for (var i = 0; i < scope.word.length; i++) {
              if (scope.word.charAt(i) == first) {
                scope.letters.push(first);
              } else {
                scope.letters.push("_");
              }
            }
          }

        });

        scope.$watchCollection('found', function(newval, oldval) {

          if (scope.word && (scope.word != undefined)) {
            for (var i = 0; i < scope.word.length; i++) {
              var current = scope.word.charAt(i);
              if (_.indexOf(scope.found, current) != -1) {
                scope.letters[i] = current.toUpperCase();
              }
            }
            if (_.indexOf(scope.letters,'_') == -1) {
              scope.isfinished = true;
            }
          }
        });

      }
    }
  });
})();
