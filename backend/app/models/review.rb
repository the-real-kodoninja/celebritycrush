class Review < ApplicationRecord
  belongs_to :user
  belongs_to :marketplace_item
end
