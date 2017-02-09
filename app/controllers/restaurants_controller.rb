class RestaurantsController < ApplicationController
    skip_before_action :new_restaurant, :verify_authenticity_token

    def search_restaurants
        @restaurants = Restaurant.all.select ['id', 'name', 'category', 'rating', 'latitude', 'longitude']
        respond_to do |format|
            format.json { render json: @restaurants }
        end
    end

    def restaurant_comments
        @restaurant = Restaurant.find(params[:id])
        @comments = @restaurant.comments.select ['id', 'content', 'food', 'service', 'price', 'created_at']
        respond_to do |format|
            format.json { render json: @comments }
        end
    end

    def new_restaurant
        @restaurant = Restaurant.new
        @restaurant.name = params[:name]
        @restaurant.category = params[:category]
        @restaurant.latitude = params[:latitude]
        @restaurant.longitude = params[:longitude]
        
        if @restaurant.save
            render :json => { :errors => false }
        else
            render :json => { :errors => @restaurant.errors.full_messages }
        end
    end

    def new_comment
        @restaurant = Restaurant.find(params[:id])
        @comment = Comment.new
        @comment.content = params[:content]
        @comment.service = params[:service]
        @comment.food = params[:food]
        @comment.price = params[:price]
        @comment.restaurant = @restaurant

        if @comment.save
            render :json => { :errors => false }
        else
            render :json => { :errors => @comment.errors.full_messages }
        end
    end
end