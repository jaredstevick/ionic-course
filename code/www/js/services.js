angular.module('songhop.services', [])

// store array of favorite songs
.factory('User', function() {
	var o = {
		favorites: []
	}
	o.addSongToFavorites = function(song) {
		// require a song to add
		if (!song) return false;

		//add it to the array
		o.favorites.unshift(song);
	}
	return o;
	
});