class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :food
      t.integer :price
      t.integer :service

      t.timestamps null: false
    end
  end
end
