(function() {
  'use strict';
  angular.module('starter.services').factory('dicoService', function() {
    return {
      dico: [{
        word: "tototo"
      }, {
        word: "caca"
      }, {
        word: "template"
      }, {
        word: "totti"
      }, {
        word: "ordinateur"
      }, {
        word: "poulet"
      }, {
        word: "majdi"
      }, {
        word: "dormir"
      }, {
        word: "oooot"
      }]
    }
  });

  angular.module('starter.services').factory('MyStorage', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage.setItem(key, value);
      },

      get: function(key, default_value) {
        return $window.localStorage.setItem(key, value) || default_value;
      },

      setObject: function(key, data) {
        $window.localStorage.setItem(key,JSON.stringify(data));
      },

      getObject: function(key) {
        return JSON.parse($window.localStorage.get(key)||"{}");
      },
      remove: function(key) {
        $window.localStorage.removeItem(key);
      },
      clear: function() {
        $window.localStorage.clear();
      }
    }
  });

})();
