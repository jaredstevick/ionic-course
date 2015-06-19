angular.module('songhop.services', [])

// store array of favorite songs
.factory('User', function() {
	var o = {
		favorites: []
	}

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
	
});