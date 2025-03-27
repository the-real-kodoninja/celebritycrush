class CreateMarketplaceItems < ActiveRecord::Migration[8.0]
  def change
    create_table :marketplace_items do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.decimal :price
      t.string :image_url
      t.string :celebrity_name
      t.string :status, default: "pending"

      t.timestamps
    end
  end
end
