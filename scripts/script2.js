var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'contact.html',
				controller  : 'contactController'
			});
	});
	
	var initializeFilters = function(filterList)
	{
		var filterDefault={};
		var index;
		//console.log(filterList);
		for (var data in filterList){
			filterDefault[data] = {};
			filterDefault[data]["displayLabel"]=filterList[data]["displayLabel"];
			filterDefault[data]["values"]={};
			for(index=0;index<filterList[data]["values"].length;++index){
			//	console.log(filterList[data][index]);
				filterDefault[data]["values"][filterList[data]["values"][index]] = true; 	
			}
		}
		//console.log(filterDefault);
		return filterDefault;	
	}
	
	var buildQueryString = function($scope,pageToCall){
		var url = 'http://127.0.0.1/naksha/'+pageToCall+'?';
	
		for(criteria in $scope.filters){
			var valCount = Object.keys($scope.filters[criteria]['values']).length;
			var trueCount = 0;
			var falseCount = 0;
			
			var stringPart = criteria+'=';
			
			for(option in $scope.filters[criteria]['values']){
				var curVal = $scope.filters[criteria]['values'][option];
				
				if(curVal){
					trueCount += 1;
					stringPart += option + ',';
				}else{
					falseCount += 1;
				}				
			}
			
			if(!(trueCount == valCount || falseCount == valCount)){
				if (stringPart.slice(-1)== ','){
					stringPart = stringPart.substring(0, stringPart.length - 1);
				}
				url += stringPart+'&';
			}
				
		}
		if (url.slice(-1)== '&' || url.slice(-1)== '?'){
			url = url.substring(0, url.length - 1);
		}
		return encodeURI(url);
		
	}
	
	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
		//initialize();
		$scope.filters = initializeFilters(sales);
		
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
		
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});