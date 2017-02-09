class Restaurant < ActiveRecord::Base
    has_many :comments
    validates :name, presence: true, length: { minimum: 3, maximum: 30 }
    validates :category, presence: true, length: { minimum: 3, maximum: 30 }
    validates :latitude, presence: true, numericality: {
                                            greater_than_or_equal_to: -90.0,
                                            less_than_or_equal_to: 90.0
                                         }
    validates :longitude, presence: true, numericality: {
                                             greater_than_or_equal_to: -180.0,
                                             less_than_or_equal_to: 180.0
                                          }
    before_save :default_values

    def update_rating
        comments = self.comments
        sum = 0
        comments.each do |comment|
            sum += 2 * comment.service / 10.0
            sum += 5 * comment.food / 10.0
            sum += 3 * comment.price / 10.0
        end
        self.rating = sum / self.comments.count
        self.save
    end

    def default_values
        self.rating ||= 0.0
    end
end