class ListCelebrity < ApplicationRecord
  belongs_to :list
  belongs_to :celebrity
  validates :list_id, uniqueness: { scope: :celebrity_id }
end
