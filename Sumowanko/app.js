// Tworzymy moduł aplikacji
var myApp = angular.module('userApp', ["xeditable"]);

myApp.run(['editableOptions', function (editableOptions) {
	editableOptions.theme = 'default';
}]);

// Tworzymy kotroler UserCtrl
myApp.controller('UserCtrl', ['$scope', '$http', function($scope, $http) {

	// tworzymy model
	$scope.users = [];
	$scope.newUser = {};

	// zasilamy danymi z pliku JSON
	$http.get('users.json').success(function(data) { 
		$scope.users = data;
		_setIndexes();
	});

  	$scope.setSuma = function(user) {
    	var sum = parseInt(user.js) + parseInt(user.jq) + parseInt(user.php);
    	return parseInt(sum);
    };

    $scope.setJSsuma = function() {
    	var sum = 0;

    	angular.forEach($scope.users, function (element) {
      		sum = sum + parseInt(element.js);
    	});

    	return sum;
    };

	$scope.setJQsuma = function() {
		var sum = 0;

		angular.forEach($scope.users, function (element) {
	    	sum = sum + parseInt(element.jq);
	  	});

		return sum;
	};

	$scope.setPHPsuma = function() {
		var sum = 0;

		angular.forEach($scope.users, function (element) {
			sum = sum + parseInt(element.php);
      	});

    	return sum;
  	};

  	$scope.setALLsuma = function() {
    	var sum = 0;

    	angular.forEach($scope.users, function (element) {
        	sum = sum + parseInt(element.suma);
      	});

    	return sum;
  	};

  	$scope.validate = function(data) {
    	if (data==null) {
      		return "Podaj liczbe";
    	}
  	};  

  	$scope.addUser = function() {
    	var newUser = $scope.newUser;
      	newUser.state = "normal"; 
      	newUser.index = $scope.users.length;
      	newUser.nazwisko_imie = "Nazwisko Imie"
      	newUser.indeks = 0;
      	newUser.js = 0;
      	newUser.jq = 0;
      	newUser.php = 0;
      	$scope.users.push(newUser); 
      	$scope.newUser = {};
  	};  

  	$scope.deleteUser = function(user) {
    	$scope.users.splice(user.index, 1); 
    	_setIndexes();
  	};

   	// metody prywatne
  	function _setIndexes() { 
    	$scope.users.forEach(function(user, index) {
        	user.index = index; 
      	}); 
  	}
}]);
