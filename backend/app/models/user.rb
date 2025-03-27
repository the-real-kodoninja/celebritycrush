class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:twitter, :google_oauth2, :twitch]

  has_many :fandom_posts
  has_many :likes
  has_many :comments
  has_many :replies
  has_many :shares
  has_many :notifications
  has_many :marketplace_items
  has_many :licenses
  has_many :reviews, dependent: :destroy
  has_many :sent_conversations, class_name: "Conversation", foreign_key: "sender_id", dependent: :destroy
  has_many :received_conversations, class_name: "Conversation", foreign_key: "recipient_id", dependent: :destroy
  has_many :messages, foreign_key: "sender_id", dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :page_type, inclusion: { in: %w[fan celebrity] }

  # New fields for Internet famous criteria
  store :social_metrics, accessors: [:follower_count, :engagement_rate, :last_post_date, :verified, :media_mentions], coder: JSON

  def internet_famous?
    return false unless follower_count && engagement_rate && last_post_date

    # Criteria for Internet famous
    follower_count >= 100_000 &&
    engagement_rate >= 3.0 &&
    last_post_date >= 6.months.ago &&
    (verified || media_mentions.to_i >= 2)
  end

  def famous?
    return false unless internet_famous?

    # Additional criteria for Famous
    follower_count >= 1_000_000 &&
    media_mentions.to_i >= 5 &&
    verified
  end

  def admin?
    admin
  end

  def conversations
    Conversation.where("sender_id = ? OR recipient_id = ?", id, id)
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email || "#{auth.uid}@#{auth.provider}.com"
      user.password = Devise.friendly_token[0, 20]
      user.username = auth.info.nickname || auth.info.name
      user.page_type = "fan"
      user.social_media_links = { auth.provider => auth.info.urls&.[]("#{auth.provider.capitalize}") || "" }
    end
  end
end