class User < ApplicationRecord
    enum role: { fan: 0, celebrity: 1 }
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
  end