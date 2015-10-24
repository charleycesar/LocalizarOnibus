'use strict';

/**
 * @ngdoc function
 * @name siteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the siteApp
 */
angular.module('siteApp')
  .controller('MapaCtrl', function ($scope,$routeParams,$http) {
  	var bus = $scope.linha = $routeParams['linha'];
	$http.get(SERVER_API+'onibus/'+bus).success(function(result){  
	  	$scope.qtd_onibus = result.DATA.length;
		$scope.onibus = result;
		$scope.map = {
	      center: {
	        latitude: -22.9272036,
	        longitude: -43.2018627
	      },
	      zoom: 12,
	      bounds: {}
	    };
    $scope.options = {
      scrollwheel: false
    };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: $scope.latitude_center,
        longitude: $scope.longitude_center,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 5; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
        }
        var marcar_no_mapa = [];
        angular.forEach($scope.onibus.DATA, function(onibus){
        	var mark = {	
        		id:onibus[1],
        		latitude: onibus[3],
        		longitude: onibus[4],
        		title: onibus[2]
        	}
        	marcar_no_mapa.push(mark);
        });
        $scope.latitude_center = _.min(marcar_no_mapa, 'latitude').latitude;

        $scope.longitude_center = _.max(marcar_no_mapa, 'longitude').longitude;

        $scope.randomMarkers = marcar_no_mapa;
      }
    }, true);
	});

    
  });
