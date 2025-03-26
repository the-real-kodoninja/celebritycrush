class AddPageTypeAndSocialMediaToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :page_type, :string, default: "fan"
    add_column :users, :social_media_links, :jsonb, default: {}
    add_column :users, :follower_count, :integer, default: 0
  end
end
