class Comment < ActiveRecord::Base
    belongs_to :restaurant
    validates :content, presence: true, length: { minimum: 3, maximum: 300 }
    validates :food, :price, :service, presence: true, 
                                       numericality: {
                                          greater_than_or_equal_to: 1,
                                          less_than_or_equal_to: 5
                                       }
    validates_presence_of :restaurant
    after_save :update_restaurant

    def update_restaurant
        self.restaurant.update_rating
    end
end
