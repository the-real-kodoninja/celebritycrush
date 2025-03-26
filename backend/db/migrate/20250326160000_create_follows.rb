class CreateFollows < ActiveRecord::Migration[8.0]
  def change
    create_table :follows do |t|
      t.references :user, foreign_key: true, null: false
      t.references :celebrity, foreign_key: true, null: false
      t.timestamps
    end
    add_index :follows, [:user_id, :celebrity_id], unique: true
  end
end
