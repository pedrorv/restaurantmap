Rails.application.routes.draw do
  root 'application#angular'

  get 'restaurants', to: 'restaurants#search_restaurants'
  get 'restaurant/:id/comments', to: 'restaurants#restaurant_comments'
  post 'new_restaurant', to: 'restaurants#new_restaurant'
  post 'new_comment', to: 'restaurants#new_comment'
end
