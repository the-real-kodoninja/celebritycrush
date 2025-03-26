class Follow < ApplicationRecord
  belongs_to :user
  belongs_to :celebrity
  validates :user_id, uniqueness: { scope: :celebrity_id }
end
