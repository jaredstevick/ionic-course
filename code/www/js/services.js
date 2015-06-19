angular.module('songhop.services', [])

// store array of favorite songs
.factory('User', function() {
	var o = {
		favorites: []
	};

	// add songs to favorites
	o.addSongToFavorites = function(song) {
		// require a song to add
		if (!song) return false;

		//add it to the array
		o.favorites.unshift(song);
	}

	// remove songs from favorites
	o.removeSongFromFavorites = function(song, index) {
		// check to see if there is song to add 
		if (!song) return false;

		// remove it
		o.favorites.splice(index, 1);
	}
	return o;
})

.factory('Recommendations', function($http, SERVER, $q) {
	var media;

	var o = {
		queue: []
	};
	

	o.getNextSongs = function() {
		return $http({
			method: 'GET',
			url: SERVER.url + '/recommendations'
		}).success(function(data){
			// put data in the queue
			o.queue = o.queue.concat(data);
		});
	}

	o.nextSong = function() {
		// pop index 0 off
		o.queue.shift();

		// end the song
		o.haltAudio();

		// fill up queue if running low
		if (o.queue.length <=3) {
			o.getNextSongs();
		};
	}

	o.playCurrentSong = function() { 
		var defer = $q.defer();

		// play current song preview
		media = new Audio(o.queue[0].preview_url);

		// when song is loaded, resolve promise for controller
		media.addEventListener("loadeddata", function(){
			defer.resolve();
		});

		media.play();

		return defer.promise;
	};

	// for use when switching to favorites
	o.haltAudio = function() {
		if (media) media.pause();
	}

	return o;
	
});