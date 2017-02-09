class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :category
      t.decimal :rating
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps null: false
    end
  end
end
