require 'test_helper'

class RestaurantTest < ActiveSupport::TestCase
  
  def setup
    @restaurant = Restaurant.new(name: 'Porcão', category: 'Churrascaria',
                                 latitude: 0.0, longitude: 0.0)
  end


  # Valid assertion
  
  test 'restaurant should be valid' do
    assert @restaurant.valid?
  end

  test 'restaurant rating should be set after save' do
    assert_nil @restaurant.rating

    @restaurant.save
    assert_equal 0.0, @restaurant.rating
  end

  test 'restaurant rating should change after adding new comment to restaurant' do
    @restaurant.save
    @comment = Comment.create(content: 'Ótimo!', food: 4, price: 4,
                              service: 4, restaurant: @restaurant)

    assert_equal 4.0, @restaurant.rating
  end


  # Invalid presence assertions

  test 'restaurant name should be present' do
    @restaurant.name = ''
    assert_not @restaurant.valid?
  end

  test 'restaurant category should be present' do
    @restaurant.category = ''
    assert_not @restaurant.valid?
  end

  test 'restaurant latitude should be present' do
    @restaurant.latitude = nil
    assert_not @restaurant.valid?
  end

  test 'restaurant longitude should be present' do
    @restaurant.longitude = nil
    assert_not @restaurant.valid?
  end


  # Invalid length assertions

  test 'restaurant name length should be between 3 and 30 characters' do
    @restaurant.name = 'a' * 2
    assert_not @restaurant.valid?

    @restaurant.name = 'a' * 31
    assert_not @restaurant.valid?
  end

  test 'restaurant category length should be between 3 and 30 characters' do
    @restaurant.category = 'a' * 2
    assert_not @restaurant.valid?

    @restaurant.category = 'a' * 31
    assert_not @restaurant.valid?
  end


  # Invalid numericality assertions 

  test 'restaurant latitude value should be between -90.0 and 90.0' do
    @restaurant.latitude = -90.1
    assert_not @restaurant.valid?

    @restaurant.latitude = 90.1
    assert_not @restaurant.valid?
  end

  test 'restaurant longitude value should be between -180.0 and 180.0' do
    @restaurant.longitude = -180.1
    assert_not @restaurant.valid?

    @restaurant.longitude = 180.1
    assert_not @restaurant.valid?
  end

end
