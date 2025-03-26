class CreateComments < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.references :user, foreign_key: true, null: false
      t.references :fandom_post, foreign_key: true, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
