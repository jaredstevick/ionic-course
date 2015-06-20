angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations, $ionicLoading) {

	// helper functions for loading
	var showLoading = function() {
		$ionicLoading.show({
			template: '<i class="ion-loading-c"></i>',
			noBackdrop: true
		});
	}

	var hideLoading = function() {
		$ionicLoading.hide();
	}

	// set loading to true on first load
	showLoading();

	Recommendations.init()
		.then(function(){
			$scope.currentSong = Recommendations.queue[0];
			return Recommendations.playCurrentSong();
			
		})
		.then(function(){
			// turn loading off
			hideLoading();
			$scope.currentSong.loaded = true;
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
			$scope.currentSong.loaded = false;
		}, 250);

		Recommendations.playCurrentSong().then(function() {
			$scope.currentSong.loaded = true;
		});
	}
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User, $window) {
	$scope.favorites = User.favorites;

	$scope.removeSong = function(song, index){
		User.removeSongFromFavorites(song, index);
	}

	$scope.openSong = function(song) {
		$window.open(song.open_url, "_system");
	}
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, Recommendations, User) {
	// stop audio when on favorites page
	$scope.enteringFavorites = function() {
		// resets new favorites to 0 when you click the favorite tab
		User.newFavorites = 0;
		Recommendations.haltAudio();
	}
	$scope.leavingFavorites = function() {
		Recommendations.init();
	}
	$scope.favCount = User.favoriteCount;
});