(function(){
  'use strict';
  angular.module('starter.services').factory('dicoService',function(){
    return {
      dico: [
        {
        word : "tototo"
        },
        {
        word : "caca"
        },
        {
        word : "template"
      }]
    }
  });
})();
