(function () {
    angular.module('restaurantMap').service('appAPI', ['$http', '$location', '$q', function ($http, $location, $q) {
        var urlOrigin = window.location.origin;

        this.getRestaurants = function () {
            return $http.get(urlOrigin + '/restaurants.json')
                        .then(function(response) {
                            return response.data;
                        }, function(error) {
                            return $q.reject('Ocorreu um erro inesperado ao carregar os restaurantes do banco de dados.');
                        });
        };

        this.addNewRestaurant = function (params) {
            return $http({
                        method: 'POST',
                        url: urlOrigin + '/new_restaurant',
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        return $q.reject('Ocorreu um erro inesperado ao adicionar o restaurante ao banco de dados.');
                    });
        };

        this.getRestaurantComments = function (id) {
             return $http.get(urlOrigin + '/restaurant/' + id + '/comments.json')
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        return $q.reject('Ocorreu um erro inesperado ao carregar os comentários do banco de dados.');
                    });
         };

         this.addNewComment = function (params) {
             return $http({
                        method: 'POST',
                        url: urlOrigin + '/new_comment',
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        return $q.reject('Ocorreu um erro inesperado ao adicionar o novo comentário ao banco de dados.');
                    });
         };
    }]);
}());