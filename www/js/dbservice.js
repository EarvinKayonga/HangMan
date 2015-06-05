(function(){
  'use strict';
  angular.module('starter.services').factory('DatabaseService', function($cordovaSQLite) {
  var Database = (function() {

    // CONSTRUCTOR

    function Database () {
      if(window.sqlitePlugin !== undefined){
        Database.db = $cordovaSQLite.openDB({ name: "HANGMAN.db" });
      }else{
        Database.db = window.openDatabase(Database.dbName,Database.dbVersion, Database.dbComments,Database.dbEstimatedSize);
      }
    }

    // ABSTRACT

    Database.prototype.execute = function(query, params, cbSuccess, cbError) {

    }

    Database.prototype.create = function(table_name, fields_description) {
    }

    Database.prototype.insert = function(table_name, fields_ar, values_ar) {
    }

    Database.prototype.count = function(table_name, callback) {
    }
    Database.prototype.remove = function(table_name, callback) {
    }

    // ATTRIBUTES

    Database.prototype.dbName          = 'HANGMAN.db'
    Database.prototype.dbVersion       = '0.01'
    Database.prototype.dbComments      = 'Efreitech'
    Database.prototype.dbEstimatedSize = 200000

    Database.prototype.db              =  undefined

    // Go
    return Database;
  })();

  return new Database;
  });
})();
