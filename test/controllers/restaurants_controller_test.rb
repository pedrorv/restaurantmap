require 'test_helper' 

class RestaurantsControllerTest < ActionController::TestCase

    def setup
        @restaurant = Restaurant.create(name: 'Porcão', category: 'Churrascaria',
                                        latitude: 0.0, longitude: 0.0)

        @comment = Comment.new(content: 'Ótimo!', food: 4, price: 4,
                               service: 4, restaurant: @restaurant)
    end

    # Valid requests

    test 'should get search_restaurants' do
        get :search_restaurants, format: :json
        assert_response :success
    end

    test 'should get restaurant_comments' do
        get :restaurant_comments, format: :json, id: @restaurant.id
        assert_response :success
    end

    test 'should post new_restaurant with all valid parameters' do
        post :new_restaurant, name: @restaurant.name, category: @restaurant.category,
                              latitude: @restaurant.latitude, longitude: @restaurant.longitude
        @response_object = JSON.parse(@response.body)
        assert_response :success
        assert_equal false, @response_object["errors"]
    end

    test 'should post new_comment with all valid parameters' do
        post :new_comment, content: @comment.content, food: @comment.food,
                           service: @comment.service, price: @comment.price,
                           id: @restaurant.id
        @response_object = JSON.parse(@response.body)
        assert_response :success
        assert_equal false, @response_object["errors"]
    end


    # Invalid requests

    test 'should not post new_restaurant without parameters' do
        post :new_restaurant
        @response_object = JSON.parse(@response.body)
        assert_equal 8, @response_object["errors"].count
    end

    test 'should not post new_restaurant with an invalid parameter' do
        post :new_restaurant, name: 'a', category: 'a' * 31,
                              latitude: -90.1, longitude: 180.1
        @response_object = JSON.parse(@response.body)
        assert_equal 4, @response_object["errors"].count
    end

    test 'should not post new_comment without parameters' do
        post :new_comment, id: @restaurant.id
        @response_object = JSON.parse(@response.body)
        assert_equal 8, @response_object["errors"].count
    end

    test 'should not post new_comment with an invalid parameter' do
        post :new_comment, id: @restaurant.id, content: 'a',
                           food: 0, price: 6, service: 0
        @response_object = JSON.parse(@response.body)
        assert_equal 4, @response_object["errors"].count
    end

end