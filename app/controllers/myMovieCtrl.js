app.controller("myMovieCtrl", function($scope, $location, FirebaseFactory){

  $scope.myMovieArray = [];

  function myMovieList(){
    FirebaseFactory.clearMoviesToWatchlist();
    FirebaseFactory.getMoviesFromFirebase();
    $scope.myMovieArray = FirebaseFactory.toWatchListArray;
  }

  $scope.addMovieRating = function(imdbID, rating) {
    for (var i = 0; i < $scope.myMovieArray.length; i++) {
      for (var key in $scope.myMovieArray[i] ) {
        if ($scope.myMovieArray[i][key] === imdbID) {
          $scope.myMovieArray[i]["userRating"] = rating;
          FirebaseFactory.updateMoviesWatchedList($scope.myMovieArray[i]);
          $scope.myMovieArray.splice(i, 1);
          break;
        };
      }
    }
    console.log("FirebaseFactory.haveWatchedListArray",FirebaseFactory.haveWatchedListArray);
  },

  $scope.DeleteMyMovieArrayItem = function(imdbID) {
            FirebaseFactory.deleteToWatchListArrayItem(imdbID);
            $scope.myMovieArray = FirebaseFactory.toWatchListArray;
          };

  myMovieList();

});