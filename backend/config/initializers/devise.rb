Devise.setup do |config|
  # Configure omniauth providers
  config.omniauth :twitter, ENV['TWITTER_CLIENT_ID'], ENV['TWITTER_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/twitter/callback"
  config.omniauth :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/google_oauth2/callback"
  config.omniauth :twitch, ENV['TWITCH_CLIENT_ID'], ENV['TWITCH_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/twitch/callback"

  # Other Devise configurations
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'
  require 'devise/orm/active_record'
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 12
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
  config.secret_key = ENV['DEVISE_SECRET_KEY'] || '43def0c9f7cd8a24acba43039bfe633536cb36e6fd84187e4fe7937ebeb831863ef52fa6e2325c17e2a007c75f6cea7133043a952555fe338018526a331932ea'
end
