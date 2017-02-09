(function () {
    angular.module('restaurantMap').controller('HomeController', 
    ['$scope', '$location', '$stateParams', 'appAPI', function ($scope, $location, $stateParams, appAPI) {

        $scope.addRestaurant = function () {
            document.activeElement.blur();

            if ($scope.$parent.newRestaurant.latitude === undefined || $scope.$parent.newRestaurant.longitude === undefined) {
                $('p.location-alert').addClass('warning');
                setTimeout(function() {
                    $('p.location-alert').removeClass('warning');    
                }, 1300);
                return;
            }

            appAPI
                .addNewRestaurant($scope.$parent.newRestaurant)
                .then(function (data) {
                    $scope.$parent.updateRestaurantsMarkers();
                }, function(error) {
                    $scope.$parent.showError(error);
                });

            $scope.$parent.clearRestaurantsStates();
            $scope.$parent.expandMap();
        };

        return $scope;
    }]);
}());