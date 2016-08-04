angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory", "google-maps"])

.run(function($ionicPlatform, DSCacheFactory, $location,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      //cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    DSCacheFactory('leagueDataCache', {storageMode: 'localStorage', maxAge: 60000, deleteOnExpire: 'aggressive'});
    DSCacheFactory('leaguesCache', {storageMode: 'localStorage', maxAge: 60000, deleteOnExpire: 'aggressive'});
    DSCacheFactory('myTeamsCache', {storageMode: 'localStorage'});
    DSCacheFactory('staticCache', {storageMode: 'localStorage'});

   $location.path('/tab/dash');
   $rootScope.$apply();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "app/layout/menu-layout.html"
    })

    .state('home', {
      abstract: true,
      url: "/home",
      templateUrl: "app/home/home.html"
    })

    .state('home.leagues', {
      url: "/leagues",
      views: {
        "tab-leagues": {
          templateUrl: "app/home/leagues.html"
        }
      }
    })

    .state('home.myteams', {
      url: "/myteams",
      views: {
        "tab-myteams": {
          templateUrl: "app/home/myteams.html"
        }
      }
    })

    .state('app.teams', {
      url: "/teams",
      views: {
        'menuContent': {
          templateUrl: "app/teams/teams.html"
        }
      }
    })

    .state('app.team-detail', {
      url: "/teams/:id",
      views: {
        'menuContent': {
          templateUrl: "app/teams/team-detail.html"
        }
      }
    })

    .state('app.game', {
      url: "/game/:id",
      views: {
        'menuContent': {
          templateUrl: "app/game/game.html"
        }
      }
    })

    .state('app.standings', {
      url: "/standings",
      views: {
        'menuContent': {
          templateUrl: "app/standings/standings.html"
        }
      }
    })

    .state('app.locations', {
      url: "/locations",
      views: {
        'menuContent': {
          templateUrl: "app/locations/locations.html"
        }
      }
    })

    .state('app.location-map', {
      url: "/location-map/:id",
      views: {
        'menuContent': {
          templateUrl: "app/locations/location-map.html"
        }
      }
    })

    .state('app.rules', {
      url: "/rules",
      views: {
        'menuContent': {
          templateUrl: "app/rules/rules.html",
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/leagues');
});