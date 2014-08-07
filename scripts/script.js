var scotchApp = angular.module('scotchApp', ['ngRoute','ui.bootstrap','ngTouch']);

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
		return filterDefault;	
	}
	
	var buildQueryString = function($scope,pageToCall){
		var url = pageToCall+'?center=true&';
	
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
	
	var hasClass = function(id, className){
		if(document.getElementById(id).className.split(" ").indexOf(className) > -1){
			return true;
		}else{
			return false;
		}
	}
	
	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
		//initialize();

		$scope.filters = initializeFilters(sales);
	
		$scope.reloadMap = function(){
		
			//console.log($scope.filters);
			if(hasClass('vehicle_map_tab','active')){
				var queryString = buildQueryString($scope, "vehicles.html");
				document.getElementById('vframe').src = queryString;
				console.log("query string for vehicles is " + queryString);
			}
			
			if(hasClass('employee_map_tab','active')){
				var queryString = buildQueryString($scope, "staff.html");
				document.getElementById('sframe').src = queryString;
				console.log("query string for staff is " + queryString);
			}

		}
		
		$scope.updateStaffFilters = function(){
			$scope.filters = initializeFilters(staff);
		}
		
		$scope.updateSalesFilters = function(){
			$scope.filters = initializeFilters(sales);
		}
		
		$scope.setAll = function(val){
			for(criteria in $scope.filters){
				for(option in $scope.filters[criteria]['values']){
					$scope.filters[criteria]['values'][option] = val;				
				}
			}
		}
		
		$scope.setOne = function(criteria,val){
			for(option in criteria.values){
				criteria.values[option]= val;			
			}
		}
		
		//document.getElementById('ia').src = 'vehicles.html';
		
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
		
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});