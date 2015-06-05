(function(){
  'use strict';
  angular.module('starter.services').factory('DatabaseService', function($cordovaSQLite) {

    var Database = (function() {

      // CONSTRUCTOR

      function Database () {

          if (window.sqlitePlugin !== undefined) {
              Database.prototype.db = $cordovaSQLite.openDB(Database.prototype.dbName );
          } else {
              Database.prototype.db = window.openDatabase(Database.prototype.dbName, Database.prototype.dbVersion, Database.prototype.dbComments, Database.prototype.dbEstimatedSize);
          }
      }

      // ABSTRACT

      Database.prototype.execute = function(query, params, cbSuccess, cbError) {

          if (!params) {
              params = [];
          }

          if (!cbSuccess) {
              cbSuccess = function(result) {}
          }

          if (!cbError) {
              cbError = function(error) {
                  console.log('db error : %s ', error.message);
              }
          }

          Database.prototype.db.transaction(function (tx) {
             tx.executeSql(query, params, function(tx, result) {
                  cbSuccess(result);
             },
             function(tx, error) {
                 cbError(error);
             });
          });
      }

      Database.prototype.create = function(table_name, fields_description) {

          var query = "CREATE TABLE IF NOT EXISTS " + table_name + " (" ;
          angular.forEach(fields_description, function(type, name) {
              query += name + " " + type + ",";
          });

          query = query.slice(0, -1);
          query += ")";

          this.execute(query);
      }

      Database.prototype.insert = function(table_name, fields_ar, values_ar) {

          var query = "INSERT INTO " + table_name + " (";

          for (var i = 0; i < fields_ar.length; i++){
              query += fields_ar[i] + ",";
          }

          query = query.slice(0, -1) + ")";
          query += " VALUES (" + Array(fields_ar.length + 1).join("?,").slice(0, -1) + ")";

          this.execute(query, values_ar);
      }


      Database.prototype.removeWithId = function(table_name, id, callback) {

          var query = "DELETE FROM " + table_name + " WHERE id = " + id + " ;";
          this.execute(query,[], function() {
              callback();
          });
      }

      Database.prototype.count = function(table_name, callback) {
          var query = "SELECT COUNT(*) FROM" + table_name + ";";
          this.execute(query, [], function(result) {
              result = result.rows.item(0);
              callback(result["COUNT(*)"]);
          });
      }

      // ATTRIBUTES

      Database.prototype.dbName          = 'HANGMAN.db'
      Database.prototype.dbVersion       = '0.01'
      Database.prototype.dbComments      = 'Efreitech project'
      Database.prototype.dbEstimatedSize = 200000

      // Go
      return Database;
    })();

    return new Database;
  });
})();
