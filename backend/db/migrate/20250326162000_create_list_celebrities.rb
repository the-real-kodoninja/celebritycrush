class CreateListCelebrities < ActiveRecord::Migration[8.0]
  def change
    create_table :list_celebrities do |t|
      t.references :list, foreign_key: true, null: false
      t.references :celebrity, foreign_key: true, null: false
      t.timestamps
    end
    add_index :list_celebrities, [:list_id, :celebrity_id], unique: true
  end
end
