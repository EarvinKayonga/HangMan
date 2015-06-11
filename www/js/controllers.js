(function() {
  'use strict';
  angular.module('starter.controllers', ['ionic', 'ngCordova','starter.services','starter.directives'])

  .controller('TabCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      }
    })
    .controller('HomeCtrl', function($scope, $stateParams) {

    })
    .controller('GameCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup,dicoService) {
      $scope.random = function(arg) {
        var item = arg[_.random(arg.length)];
        return item;
      }
      $scope.meta = {
        word: undefined,
        currentstep: 0,
        nbStep: 0,
        isfinished: false,
        currentPlayer: "user"
      }
      $scope.lettres = [];

      $ionicModal.fromTemplateUrl('/templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.game = function() {
        $scope.openModal();
      }
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.$on('modal.shown', function() {

        $ionicPopup.prompt({
          title: 'The word',
          template: 'Choose a word the CPU will have to find',
          inputType: 'text',
          inputPlaceholder: 'the word between 3 and 10 letters',
          cancelText: 'Random ',
          onTap : function(e){
            e.preventDefault();
            return false;
          }
        }).then(function(res) {


           if (res == undefined) {
            $scope.meta.word = $scope.random(dicoService.dico).word.toUpperCase();

          } else if ((res.length > 2) && (res.length < 11)) {
            $scope.meta.word = res.toUpperCase();

          }else {
            $scope.meta.word = undefined;
            console.log("error");
          }
        })

      });



    })
    .controller('SettingCtrl', function($scope, $stateParams) {
      $scope.facebook = function() {
        alert('facebook');
      };

      $scope.settings = {
        sound: true,
        level: {
          value: "Easy",
          possibilities: ["Easy", "Medium", "Hard"]
        },
        fast: true
      };




    })
    .controller('ScoringCtrl', function($scope, $stateParams) {
      $scope.score = [{
        name: "Madji Toumi",
        score: 42
      }, {
        name: "Mathieu",
        score: 21
      }, {
        name: "Fabien",
        score: 20
      }, {
        name: "Randy",
        score: 18
      }, {
        name: "Earvin",
        score: 18
      }, {
        name: "Louis",
        score: 12
      }, {
        name: "Raffaele",
        score: 10
      }];
    })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });


})();
