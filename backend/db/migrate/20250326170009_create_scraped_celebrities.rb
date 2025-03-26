class CreateScrapedCelebrities < ActiveRecord::Migration[8.0]
  def change
    create_table :scraped_celebrities do |t|
      t.string :name
      t.datetime :scraped_at

      t.timestamps
    end
  end
end
