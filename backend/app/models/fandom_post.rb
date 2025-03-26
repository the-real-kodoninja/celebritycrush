class FandomPost < ApplicationRecord
  belongs_to :user
  belongs_to :celebrity
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :shares, dependent: :destroy
  validates :content, presence: true
end
