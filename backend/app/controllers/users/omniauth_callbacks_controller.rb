class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    handle_auth("Twitter")
  end

  def google_oauth2
    handle_auth("Google")
  end

  def twitch
    handle_auth("Twitch")
  end

  def bluesky
    handle_auth("Bluesky")
  end

  private

  def handle_auth(provider)
    auth = request.env["omniauth.auth"]
    user = User.from_omniauth(auth)

    if user.persisted?
      # Check fame via social media followers
      follower_count = fetch_follower_count(auth)
      user.update(follower_count: follower_count)
      if follower_count >= 300_000
        user.update(badge: "internet_famous")
        Notification.create(user: user, message: "You're internet famous! Badge added.")
      elsif follower_count >= 1_000_000
        user.update(badge: "famous")
        Notification.create(user: user, message: "You're a celebrity! Famous badge added.")
      end
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider) if is_navigational_format?
    else
      session["devise.#{provider.downcase}_data"] = auth
      redirect_to new_user_registration_url
    end
  end

  def fetch_follower_count(auth)
    case auth.provider
    when "twitter"
      auth.extra.raw_info.followers_count
    when "google_oauth2"
      0 # Google doesn't provide follower count; use YouTube API if needed
    when "twitch"
      auth.extra.raw_info.followers
    when "bluesky"
      auth.extra.raw_info.followers_count || 0
    else
      0
    end
  end
end
