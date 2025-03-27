class AddCategoryAndLocationToScrapedCelebrities < ActiveRecord::Migration[7.0]
  def change
    add_column :scraped_celebrities, :category, :string
    add_column :scraped_celebrities, :location, :string
  end
end
