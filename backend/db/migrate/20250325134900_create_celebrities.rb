class CreateCelebrities < ActiveRecord::Migration[8.0]
  def change
    create_table :celebrities do |t|
      t.string :name, null: false
      t.string :json_path
      t.timestamps
    end
    add_index :celebrities, :name, unique: true
  end
end
