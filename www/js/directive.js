(function() {
  'use strict';
  angular.module('starter.directives', ['ionic', 'ngCordova'])
    .directive('hangmanStep', function() {
      return {
        restrict: 'E',
        replace : true,
        templateUrl : "templates/directive/hangmanstep.html",
        scope : {
          index : '='
        },
        link: function(scope, elem, attrs) {
        }

      }
    })/*
    .directive('hangmanData', function() {
      return {
        restrict: 'E',

        link: function(scope, elem, attrs) {

        }

      };
    })*/



})();
