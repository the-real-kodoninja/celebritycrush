class MarketplaceItem < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy

  validates :title, :description, :price, :image_url, :celebrity_name, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: %w[pending approved rejected] }
end
