(function () {
    angular
        .module('restaurantMap')
        .filter('truncateString', function() {
            return function (input, limit, shouldTruncate) {
                if (!shouldTruncate || input.length <= limit) return input;

                return input.slice(0, limit) + '... <span class="comment-see-more">Ver mais<span>';
            }
        });
}());