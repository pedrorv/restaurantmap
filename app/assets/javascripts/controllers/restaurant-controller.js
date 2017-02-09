(function () {
    angular.module('restaurantMap').controller('RestaurantController', 
    ['$scope', '$location', '$stateParams', '$sce', 'appAPI', function ($scope, $location, $stateParams, $sce, appAPI) {
        $scope.restaurantId = $stateParams.id;
        $scope.truncateToSize = 80;

        $scope.toggleNewCommentForm = function() {
            $scope.newComment = {
                price: 0,
                food: 0,
                service: 0,
                content: ''
            };

            if ($('div.new-restaurant-container').hasClass('open')) {
                $('div.new-restaurant-container').removeClass('open');
            } else {
                $('div.new-restaurant-container').addClass('open');
            }
        };

        $scope.addComment = function() {
            document.activeElement.blur();

            if ($scope.newComment.price === 0 || 
                $scope.newComment.service === 0 || 
                $scope.newComment.food === 0) {

                $('p.ratings-label').addClass('warning');
                setTimeout(function() {
                    $('p.ratings-label').removeClass('warning');    
                }, 1300);
                return;
            }

            var params = {
                id: $scope.restaurantId,
                content: $scope.newComment.content,
                service: $scope.newComment.service,
                food: $scope.newComment.food,
                price: $scope.newComment.price
            };

            appAPI
                .addNewComment(params)
                .then(function(data) {
                    $scope.$parent.updateRestaurantsMarkers();
                    $scope.loadComments();
                }, function(error) {
                    $scope.$parent.showError(error);
                });

            $scope.toggleNewCommentForm();
            $scope.newComment = {};
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.currentTab = toState.data.selectedTab;
        });

        $scope.$watch('$parent.restaurants', function() {
            $scope.$parent.setRestaurant($scope.restaurantId);

            // Only shrink map if in one of the restaurants page. Deal with route changing to home shrink bug.
            if (window.location.hash.indexOf('restaurant') !== -1) {
                $scope.$parent.shrinkMap();
            }
        });
        
        $scope.loadComments = function() {
            appAPI.getRestaurantComments($scope.restaurantId)
              .then(function (comments) {
                  $scope.restaurantComments = comments.map(function(commentObj) {
                      var newObj = commentObj;
                      newObj.filterText = true;
                      return newObj;
                  });
              }, function(error) {
                  $scope.$parent.showError(error);
              });
        };

        $scope.toggleFilter = function (id) {
            var commentToChange = $scope.restaurantComments.filter(function(comment) {
                return id === comment.id;
            })[0];

            commentToChange.filterText = !commentToChange.filterText;
        };

        $scope.getArrayOfSize = function (plus, minus) {
            var decrease, increase;

            if (minus === undefined) decrease = 0;
            else decrease = Math.round(Number(minus));

            increase = Math.round(Number(plus));

            

            return new Array((isNaN(increase - decrease)) ? 0 : increase - decrease);
        };

        // http://stackoverflow.com/questions/9381926/angularjs-insert-html-into-view 

        $scope.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.loadComments();

        return $scope;
    }]);
}());