var app = angular.module('app',['chart.js']);

app.filter('ceil', function() {
	return function(input) {
		return Math.ceil(input);
	};
});

app.controller('controller', function ($scope, $http) {

	
	$scope.limit=[];
	$scope.data1=[];
	$scope.series1=[];
	$scope.series2=[];
	$scope.data2=[];
	$scope.labels=[];
	$scope.items = [];
	$scope.machines;
	$scope.tests;
	$scope.size = 0;
	$scope.offset = 0;
	$scope.length = 5;
	$scope.num = 0;
	
	
	
	
	var size = function() {
		$http({method:'GET',url:'webapi/measure/size'})
		.then(function onSuccess(response) {
			$scope.size = response.data;
			$scope.num = $scope.size / 2;
		}, function onError(response) {
			$scope.size = 0;
		});  			
	}
	
	var page = function() {
		$http({method:'GET',url:'webapi/measure/limit?offset='+$scope.offset+'&length='+$scope.length})
		.then(function onSuccess(response) {
			$scope.limit = response.data;
		}, function onError(response) {
			$scope.breweries = [];
		});
	}

	$scope.prev = function() {
		if ($scope.length <= $scope.offset) {
			$scope.offset = $scope.offset - $scope.length;
			page();
		}
	}

	$scope.next = function() {
		if ($scope.offset + $scope.length < $scope.size) {
			$scope.offset = $scope.offset + $scope.length;
			page();			
		}
	}

	$scope.first = function() {
		$scope.offset = 0;
		page();
	}

	$scope.last = function() {
		$scope.offset = Math.floor(($scope.size - 1) / $scope.length) * $scope.length;
		page();
	}

	size();
	page();

	
	
	var getall = function(){
		$http({method:'GET',url:'webapi/measure/getall'})
		.then(function onSuccess(response) {
			$scope.items = response.data;
		}, 
		function onError(response) {
			$scope.items = [];
		});  
	}
	
	//getall();
	
	
	$scope.select = function(item){
		
		var id = item.id;
		var machine = item.Machine;
		if(machine == "Ardgetti"){
			ardgetti(id);	
		} else {
			peaktech(id);
		}
		
	}
	
	$scope.remove = function(item){
		var id = item.id;
		var machine = item.Machine;
		if(machine == "Ardgetti"){
			ardgetti_remove(id);
		} else {
			peaktech_remove(id);
		}
	}
	
	var ardgetti_remove = function(id){
		$http({method: 'GET',url:'webapi/measure/remove?id='+id})
		.then(function onSuccess(){
			$scope.clean();
		});
	}
	
	var peaktech_remove = function(id){
		$http({method: 'GET',url:'webapi/measure/remove?id='+id})
		.then(function onSuccess(){
			$scope.clean();
		});
	}
	

	
	
	var ardgetti = function(id) {
		$http({method:'GET',url:'webapi/measure/getbyone?id='+id})
		.then(function onSuccess(response) {
			$scope.ardgets = response.data;
			$scope.measureA = response.data.Measure;
			$scope.machines = response.data.Machine;
			$scope.tests = response.data.Test;
			processArdgetti();
		}, function onError(response) {
			$scope.measureA = [];
		});  			
	}
	
  var processArdgetti = function() {
	  
		angular.forEach($scope.measureA, function(ardget, index) {
			
			$scope.labels.push(index);
			$scope.data1.push(ardget);
			
		});
		$scope.data = [$scope.data1,$scope.data1];
		$scope.series1.push($scope.ardgets.Machine);
		$scope.series2.push($scope.ardgets.Machine);
		
	}
  
 
	

	var peaktech = function(id) {
		$http({method:'GET',url:'webapi/measure/getbyone?id='+id})
		.then(function onSuccess(response) {
			$scope.peaks = response.data;
			$scope.measureP = response.data.Measure;
			$scope.machines = response.data.Machine;
			$scope.tests = response.data.Test;
			processPeaktech();
		}, function onError(response) {
			$scope.measureP = [];
		});  			
	}
	
	
	 
	
 
  var processPeaktech = function() {
		
		angular.forEach($scope.measureP, function(peak, index) {
			
			
				$scope.labels.push(index);
				$scope.data2.push(peak);
		});
		$scope.data = [$scope.data2,$scope.data2];
		$scope.series1.push($scope.peaks.Machine);
		$scope.series2.push($scope.peaks.Machine);
	}
		
  
   $scope.clean = function(){
	  location.reload();
  }


	
	  $scope.series = [$scope.series1,$scope.series2];
	  
	  
		  $scope.onClick = function (points, evt) {
		    console.log(points, evt);
		  };
		  
		  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
		  $scope.options = {
		    scales: {
		      yAxes: [
		        {
		          id: 'y-axis-1',
		          type: 'linear',
		          display: true,
		          position: 'left'
		        }
		        
		      ]
		    }
		  };

	 
	 
  
  
  

});