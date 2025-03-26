class CreateLists < ActiveRecord::Migration[8.0]
  def change
    create_table :lists do |t|
      t.references :user, foreign_key: true, null: false
      t.string :name, null: false
      t.timestamps
    end
  end
end
