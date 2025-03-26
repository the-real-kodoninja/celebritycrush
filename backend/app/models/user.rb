class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:twitter, :google_oauth2, :twitch, :bluesky]

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

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email || "#{auth.uid}@#{auth.provider}.com"
      user.password = Devise.friendly_token[0, 20]
      user.username = auth.info.nickname || auth.info.name
      user.page_type = "fan" # Default to fan; updated in callback if famous
      user.social_media_links = { auth.provider => auth.info.urls&.[]("#{auth.provider.capitalize}") || "" }
    end
  end
end