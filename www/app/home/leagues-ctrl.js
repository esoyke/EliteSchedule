(function(){
	'use strict';
	angular.module('eliteApp').controller('LeaguesCtrl', ['$state', 'eliteApi', LeaguesCtrl]);

	function LeaguesCtrl ($state, eliteApi) {
		var vm = this;
		eliteApi.getLeagues().then(function(data){
			vm.leagues = data;
		});

		// var leagues = eliteApi.getLeagues();
		// vm.leagues = leagues;
		// console.log(leagues);

		vm.selectLeague = function(leagueId){
			eliteApi.setLeagueId(leagueId);
			$state.go('app.teams');
		}

	}

})();
