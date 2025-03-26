class Like < ApplicationRecord
  belongs_to :user
  belongs_to :fandom_post
  validates :user_id, uniqueness: { scope: :fandom_post_id }
end
