class CreateLicenses < ActiveRecord::Migration[7.0]
  def change
    create_table :licenses do |t|
      t.references :user, null: false, foreign_key: true
      t.string :celebrity_name
      t.text :terms
      t.boolean :approved, default: false

      t.timestamps
    end
  end
end
