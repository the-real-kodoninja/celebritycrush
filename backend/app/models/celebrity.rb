class Celebrity < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
