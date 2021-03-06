(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamDetailCtrl', ['$stateParams', '$ionicPopup', 'eliteApi', 'myTeamsService', TeamDetailCtrl]);

    function TeamDetailCtrl($stateParams, $ionicPopup, eliteApi, myTeamsService) {
        var vm = this,
        team = null,
        leagueData = null;
        
        vm.teamId = Number($stateParams.id);
        //var data = eliteApi.getLeagueData();

        eliteApi.getLeagueData().then(function(data){
            // something was changed in lodash that broke this chain, 
            // I am using the older v2.4.1 of lodash used by the tutorial        
            team = _.chain(data.teams)
					.flatten('divisionTeams')
					.find({'id': vm.teamId})
					.value();
            // console.log(vm.teamId);
            // console.log(data.teams);
            vm.teamName = team.name;

            vm.games = _.chain(data.games)
            						 .filter(isTeamInGame)
            						 .map(function(item){
            						 		var isTeam1 = (item.team1Id === vm.teamId ? true : false);
            						 		var opponentName = isTeam1 ? item.team2 : item.team1;
            						 		var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
            						 		return {
            						 			gameId: item.id,
            						 			opponent: opponentName,
            						 			time: item.time,
            						 			location: item.location,
            						 			locationUrl: item.locationUrl,
            						 			scoreDisplay: scoreDisplay,
            						 			homeAway: (isTeam1 ? 'vs.' : 'at')
            						 		};
            						 })
            						 .value();

            vm.teamStanding = _.chain(data.standings)
                                    .flatten('divisionStandings')
                                    .find({'teamId': vm.teamId})
                                    .value();
            leagueData = data.league;
        });

        vm.following = myTeamsService.isFollowingTeam(vm.teamId);//false;
        vm.toggleFollow = function() {
            //vm.following = !vm.following;
            if(vm.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });
                confirmPopup.then(function(res){
                    if(res){
                        vm.following = !vm.following;
                        myTeamsService.unfollow(vm.teamId);
                    }
                });
            } else{
                vm.following = !vm.following;
                myTeamsService.followTeam({ id: team.id, name: team.name, leagueId: leagueData.id, leagueName: leagueData.name });
            }
        };                        

        function isTeamInGame(item) {
        	return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }
        function getScoreDisplay(isTeam1, team1Score, team2Score){
        	if(team1Score && team2Score){
        		var teamScore = (isTeam1 ? team1Score : team2Score);
        		var opponentScore = (isTeam1 ? team2Score : team1Score);
        		var winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
        		return winIndicator + teamScore + '-' + opponentScore;
        	}
        	else{
        		return '';
        	}
        }

    };
})();