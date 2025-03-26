class CreateReplies < ActiveRecord::Migration[8.0]
  def change
    create_table :replies do |t|
      t.references :user, foreign_key: true, null: false
      t.references :comment, foreign_key: true, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
