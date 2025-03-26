class FandomPost < ApplicationRecord
  belongs_to :user
  belongs_to :celebrity
  validates :content, presence: true
end
