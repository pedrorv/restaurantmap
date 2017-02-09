(function() {
    // https://github.com/melloc01/angular-input-stars input stars

    angular.module('restaurantMap', ['ui.router', 'uiGmapgoogle-maps', 'ngMaterial', 'angular-input-stars'])
        .config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider.state('home', {
                    url: '/home',
                    templateUrl: '/templates/home.html',
                    controller:'HomeController as homeCtrl'
                })
                .state('restaurant', {
                    url: '/restaurant/:id',
                    templateUrl: '/templates/restaurant.html',
                    controller: 'RestaurantController as restCtrl',
                    data: {
                        'selectedTab': 0
                    }
                })
                .state('restaurant-comments', {
                    url: '/restaurant/:id/comments',
                    templateUrl: '/templates/restaurant.html',
                    controller: 'RestaurantController as restCtrl',
                    data: {
                        'selectedTab': 1
                    }
                });

                // Restaurant info routing solution from
                // http://stackoverflow.com/questions/27221222/separate-controller-per-tab-in-angular-material-w-ui-router 

                $urlRouterProvider.otherwise('home');
            }]);
}());