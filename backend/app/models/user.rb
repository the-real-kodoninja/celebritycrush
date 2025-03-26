class User < ApplicationRecord
  validates :username, :email, presence: true, uniqueness: true
end
