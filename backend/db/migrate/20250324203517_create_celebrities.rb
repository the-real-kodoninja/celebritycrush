class CreateCelebrities < ActiveRecord::Migration[8.0]
  def change
    create_table :celebrities do |t|
      t.string :name
      t.text :bio
      t.jsonb :data

      t.timestamps
    end
  end
end
