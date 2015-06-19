angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {

	Recommendations.getNextSongs()
		.then(function(){
			$scope.currentSong = Recommendations.queue[0];
		});

	$scope.nextAlbumImg = function() {
		if (Recommendations.queue.length > 1) {
			return Recommendations.queue[1].image_large;
		}
		return '';
	}
	
	// fires when song is favorited or skipped
	$scope.sendFeedback = function(bool) {

		//add to favorites if favorited
		if (bool) User.addSongToFavorites($scope.currentSong);

		// set variable for animation sequence
		$scope.currentSong.rated = bool;
		$scope.currentSong.hide = true;

		Recommendations.nextSong();

		$timeout(function(){
			// update current song in scope
			$scope.currentSong = Recommendations.queue[0];
		}, 250);
	}
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
	$scope.favorites = User.favorites;

	$scope.removeSong = function(song, index){
		User.removeSongFromFavorites(song, index);
	}
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});