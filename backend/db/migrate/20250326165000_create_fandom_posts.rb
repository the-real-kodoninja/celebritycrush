class CreateFandomPosts < ActiveRecord::Migration[8.0]
  def change
    create_table :fandom_posts do |t|
      t.references :user, foreign_key: true, null: false
      t.references :celebrity, foreign_key: true, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
