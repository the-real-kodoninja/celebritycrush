class List < ApplicationRecord
  belongs_to :user
  has_many :list_celebrities, dependent: :destroy
  has_many :celebrities, through: :list_celebrities
  validates :name, presence: true
end
