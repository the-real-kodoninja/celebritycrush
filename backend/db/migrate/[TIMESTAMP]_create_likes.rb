class CreateLikes < ActiveRecord::Migration[8.0]
  def change
    create_table :likes do |t|
      t.references :user, foreign_key: true, null: false
      t.references :fandom_post, foreign_key: true, null: false
      t.timestamps
    end
    add_index :likes, [:user_id, :fandom_post_id], unique: true
  end
end
