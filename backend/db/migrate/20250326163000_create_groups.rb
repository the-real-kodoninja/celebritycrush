class CreateGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.text :description
      t.references :creator, foreign_key: { to_table: :users }, null: false
      t.timestamps
    end
  end
end
