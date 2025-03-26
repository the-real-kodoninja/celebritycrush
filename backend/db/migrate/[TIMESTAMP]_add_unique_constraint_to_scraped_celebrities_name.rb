class AddUniqueConstraintToScrapedCelebritiesName < ActiveRecord::Migration[7.0]
  def change
    add_index :scraped_celebrities, :name, unique: true
  end
end
