class AddBadgeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :badge, :string
  end
end
