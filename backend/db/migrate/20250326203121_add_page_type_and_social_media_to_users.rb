class AddPageTypeAndSocialMediaToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :page_type, :string
    add_column :users, :social_media_links, :jsonb
    add_column :users, :follower_count, :integer
  end
end
