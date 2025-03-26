class User < ApplicationRecord
  has_many :fandom_posts
  has_many :likes
  has_many :comments
  has_many :replies
  has_many :shares
  has_many :notifications

  validates :username, presence: true, uniqueness: true
  validates :page_type, inclusion: { in: %w[fan celebrity] }

  def internet_famous?
    badge == "internet_famous"
  end

  def famous?
    badge == "famous"
  end
end