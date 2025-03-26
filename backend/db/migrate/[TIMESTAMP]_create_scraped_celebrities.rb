class CreateScrapedCelebrities < ActiveRecord::Migration[8.0]
  def change
    create_table :scraped_celebrities do |t|
      t.string :name, null: false
      t.datetime :scraped_at
      t.timestamps
    end
    add_index :scraped_celebrities, :name, unique: true
  end
end
