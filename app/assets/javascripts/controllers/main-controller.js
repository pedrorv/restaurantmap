(function () {
    angular.module('restaurantMap')
        .controller('MainController', [ '$http', '$scope', '$location', 'appAPI', function ($http, $scope, $location, appAPI) {
            function resizeMap() {
                var browserHeight = $(window).height();
                var footerHeight = $('footer').height();
                var elementHeight = browserHeight - 100 - 100 - footerHeight;
                $('.angular-google-map-container').css('height', elementHeight);
                $('div#window').css('height', elementHeight);
                $('div#map-holder').css('height', elementHeight);
            }

            resizeMap();

            $(window).on('resize', resizeMap);

            $scope.newRestaurant = {};
            $scope.restaurant = {};

            $scope.currentPosition = undefined;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.currentPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    $scope.userOptions = {
                        icon: 'images/you-icon.png'
                    };

                    $scope.map.center = {
                        latitude: $scope.currentPosition.latitude,
                        longitude: $scope.currentPosition.longitude
                    };
                }, function() {
                    console.log('Incapaz de pegar posição atual');
                });
            }

            $scope.showError = function(error) {
                var errorsContainer = $('div#error-messages');
                errorsContainer.html('');

                errorsContainer.append('<h2>Erro:</h2>');
                errorsContainer.append('<p>' + error + '<p>');
                errorsContainer.fadeIn().addClass("show");

                setTimeout(function() {
                    errorsContainer.fadeOut("show");
                }, 4000);
            };

            $scope.clearRestaurantsStates = function() {
                $scope.newRestaurant = {};
                $scope.restaurant = {};
            };
            
            $scope.shrinkMap = function () {
                $('div#map').addClass('shrink');
            };

            $scope.expandMap = function () {
                $('div#map').removeClass('shrink');
            };

            $scope.redirectToHome = function () {
                $scope.clearRestaurantsStates();
                $scope.updateRestaurantsMarkers();
                $scope.expandMap();

                $location.path('/home');
            };

            $scope.clearRestaurantState = function () {
                $scope.restaurant = {};
            };

            $scope.redirectToRestaurantPage = function (restaurant) {
                $scope.restaurant = restaurant;
                $location.path('/restaurant/' + restaurant.id);
                $scope.shrinkMap();
            };

            $scope.openAddRestaurantBox = function () {
                if (window.location.hash.indexOf('home') === -1) {
                    $scope.redirectToHome();
                }
                
                $scope.shrinkMap();                
            };

            $scope.closeContentBox = function () {
                $scope.redirectToHome();
            };

            $scope.setRestaurant = function (id) {
                $scope.restaurant = $scope.restaurants.filter(function(rest) { return rest.id == id; })[0];
            };
            
            $scope.restaurants = [];

            $scope.map = {
                center: {
                    latitude: -23,
                    longitude: -43
                },
                zoom: 10,
                options: {
                    disableDefaultUI: true
                },
                events: {
                    click: function() {}
                },
                markersEvents: {
                    click: function() {}
                }
            };


            $scope.updateRestaurantsMarkers = function () {
                appAPI.getRestaurants()
                    .then(function (data) {
                        if ($scope.restaurants.length === 0) {
                            $scope.restaurants = data;

                            $scope.map = {
                                center: {
                                    latitude: ($scope.currentPosition === undefined) ?
                                              $scope.map.center.latitude : 
                                              $scope.currentPosition.latitude,
                                    longitude: ($scope.currentPosition === undefined) ?
                                                $scope.map.center.longitude :
                                                $scope.currentPosition.longitude
                                },
                                zoom: $scope.map.zoom,
                                options: {
                                    disableDefaultUI: true
                                },
                                events: {
                                    click: function (map, eventName, eventArgs) {
                                        var evt = eventArgs[0];
                                        $scope.newRestaurant.latitude = evt.latLng.lat();
                                        $scope.newRestaurant.longitude = evt.latLng.lng();
                                        $scope.$apply();
                                    }
                                },
                                markersEvents: {
                                    click: function (marker, eventName, eventArgs) {
                                        $scope.redirectToRestaurantPage(eventArgs);
                                    }
                                }
                            };
                        } else {
                            $scope.restaurants = data;
                        }
                    }, function(error) {
                        $scope.showError(error);
                    });
            };

            $scope.updateRestaurantsMarkers();
        }]);
}());