'use strict';

/**
 * @ngdoc overview
 * @name siteApp
 * @description
 * # siteApp
 *
 * Main module of the application.
 */
var SERVER_API = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/";
angular
  .module('siteApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: 'home'
      })
      .when('/servico', {
        templateUrl: 'views/servico.html',
        controller: 'ServicoCtrl',
        activeTab: 'servico'
      })
      .when('/cardapio', {
        templateUrl: 'views/cardapio.html',
        controller: 'CardapioCtrl',
        activeTab: 'cardapio'
      })
      .when('/equipe', {
        templateUrl: 'views/equipe.html',
        controller: 'EquipeCtrl',
        activeTab: 'equipe'
      })
      .when('/contato', {
        templateUrl: 'views/contato.html',
        controller: 'ContatoCtrl',
        activeTab: 'contato'
      })
      .when('/mapa/:linha', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        activeTab: 'mapa'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('siteApp').controller('MenuCtrl', function ($scope,$route){
    $scope.$route = $route;
})