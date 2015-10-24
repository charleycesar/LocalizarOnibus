'use strict';

/**
 * @ngdoc function
 * @name siteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the siteApp
 */
angular.module('siteApp')
  .controller('MainCtrl', function ($scope,$http) {
	$scope.onibus = [];
    $http.get(SERVER_API+'obterTodasPosicoes').success(function(result){    
    	angular.forEach(result.DATA, function(i){
			if(i[2]){
				var bus = {};
				var linha = i[2];
				bus.linha = linha;
				$scope.onibus.push(bus);
			}
		});
		$scope.onibus = _.uniq($scope.onibus, 'linha');

    });
   
  });
