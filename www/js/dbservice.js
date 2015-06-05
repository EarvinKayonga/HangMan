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
      var query = 'CREATE TABLE' + table_name + "(";
      angular.forEach(fields_description,function(type,name){
        query = name + " " + type + ",";
      });
      query = query.slice(0,-1) + ")";
      this.execute(query);
    }

    Database.prototype.insert = function(table_name, fields_ar, values_ar) {
      var query = 'INSERT INTO' + table_name + "(";
      for(var i = 0; i <fields_ar.length; i++){
        query += fields[i] + ",";
      }
      query = query.slice(0,-1) + ")";
      query  = " VALUES (" + array[fields_ar.length]join("?,").slice(0,-1) + " )";
      this.execute(query, values_ar);

    }

    Database.prototype.count = function(table_name, callback) {
    }
    Database.prototype.removeWithId = function(table_name, id, callback) {
      var query = "DELETE FROM" + table_name + " WHERE id = " + id + " ;";
      this.execute(query,[], function(){
        callback();
      });

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
