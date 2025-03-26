class AddMediaToFandomPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :fandom_posts, :media_url, :string
    add_column :fandom_posts, :media_type, :string
  end
end
