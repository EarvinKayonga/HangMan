(function() {
  'use strict';
  angular.module('starter.controllers', ['ionic', 'ngCordova', 'starter.services', 'starter.directives', 'starter.directivedata'])

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
    .controller('GameCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, dicoService, $timeout) {

      $scope.random = function(arg) {
        var item = arg[_.random(arg.length - 1)];
        return item;
      }
      $scope.meta = {
        word: undefined,
        currentstep: 0,
        nbStep: 0,
        isfinished: false,
        currentPlayer: "user"
      }

      $scope.$watch('meta.isfinished', function(newval, oldval) {
        if ($scope.meta.isfinished || ($scope.nbStep===10)) {
          $scope.$broadcast('game-end');
        }
      });

      $scope.lettres = [];
      $scope.nextByCpu = function() {
        if ((!$scope.meta.isfinished) && ($scope.meta.nbStep < 10)) {
          var charset = "abcdefghijklmnopqrstuvwxyz";
          var lettre = charset.charAt(Math.floor(Math.random() * charset.length));
          if ($scope.meta.word.indexOf(lettre.toUpperCase()) != -1) {
            $scope.lettres.push(lettre.toUpperCase());
          } else {
            $scope.meta.nbStep++;
          }
          console.log(lettre);

        }
      }

      // Event
      $scope.$on('computer-play', function() {
        $scope.interval = setInterval(function() {
          $scope.nextByCpu();
          $scope.$apply();
        }, 3000);
      });

      $scope.$on('game-end', function() {
        clearInterval($scope.interval);
        var mytitle, mytemplate;
        if ($scope.meta.isfinished) {
          mytitle = "Well done";
          mytemplate = "You won";

        } else {
          mytitle = "Sorry ";
          mytemplate = "You lost";
        }

        $ionicPopup.alert({
          title: mytitle,
          template: mytemplate
        }).then(function(){
          $scope.meta.found = [];
          $scope.meta.lettres = [];
          $scope.meta.currentstep = 0;
          $scope.meta.nbStep = 0;
          $scope.meta.isfinished= false;

        });

      });

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
        $timeout(function() {
          $ionicPopup.show({
            title: 'Choose a word between 3 and 10',
            template: '<input type="text" ng-model="meta.word">',
            inputPlaceholder: 'Choose a word the CPU will have to find',
            scope: $scope,
            buttons: [{
              text: 'Random',
              type: 'button-energized',
              onTap: function(e) {
                e.preventDefault();
                $scope.meta.word = $scope.random(dicoService.dico).word.toUpperCase();
                // return implicite car le mot est déjà stock dans le scope gràace au ng-model du input
              }
            }, {
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.meta.word || $scope.meta.word.length < 3 || $scope.meta.word.length > 10) {
                  //don't allow the user to close unless he clicks on Ok
                  e.preventDefault();
                }
              }
            }]
          }).then(function(res) {
            console.log('The choosen is  : ' + $scope.meta.word); //FIXME
            $scope.$broadcast('computer-play');
          });
        }, 600);

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
