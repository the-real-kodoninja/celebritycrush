config.omniauth :twitter, ENV['TWITTER_CLIENT_ID'], ENV['TWITTER_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/twitter/callback"
config.omniauth :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/google_oauth2/callback"
config.omniauth :twitch, ENV['TWITCH_CLIENT_ID'], ENV['TWITCH_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/twitch/callback"
# Bluesky (custom provider, if gem not available)
config.omniauth :bluesky, ENV['BLUESKY_CLIENT_ID'], ENV['BLUESKY_CLIENT_SECRET'], callback_url: "http://localhost:3000/users/auth/bluesky/callback"
