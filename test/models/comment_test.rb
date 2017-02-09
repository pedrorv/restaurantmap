require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  
  def setup
        @restaurant = Restaurant.create(name: 'Porcão', category: 'Churrascaria',
                                        latitude: 0.0, longitude: 0.0)

        @comment = Comment.new(content: 'Ótimo!', food: 4, price: 4,
                               service: 4, restaurant: @restaurant)
    end

    # Valid assertion

    test 'comment should be valid' do
      assert @comment.valid?
    end


    # Invalid presence assertion

    test 'comment content should be present' do
      @comment.content = nil
      assert_not @comment.valid?
    end

    test 'comment food should be present' do
      @comment.food = nil
      assert_not @comment.valid?
    end

    test 'comment service should be present' do
      @comment.service = nil
      assert_not @comment.valid?
    end

    test 'comment price should be present' do
      @comment.price = nil
      assert_not @comment.valid?
    end

    test 'comment restaurant should be present' do
      @comment.restaurant = nil
      assert_not @comment.valid?
    end


    # Invalid length assertion

    test 'comment content length should be between 3 and 300 characters' do
      @comment.content = 'a' * 2
      assert_not @comment.valid?

      @comment.content = 'a' * 301
      assert_not @comment.valid?
    end


    # Invalid numericality assertion

    test 'comment food value should be between 1 and 5' do
      @comment.food = 0
      assert_not @comment.valid?

      @comment.food = 6
      assert_not @comment.valid?
    end

    test 'comment price value should be between 1 and 5' do
      @comment.price = 0
      assert_not @comment.valid?

      @comment.price = 6
      assert_not @comment.valid?
    end

    test 'comment service value should be between 1 and 5' do
      @comment.service = 0
      assert_not @comment.valid?

      @comment.service = 6
      assert_not @comment.valid?
    end
end
