class Users::RegistrationsController < Devise::RegistrationsController
  def create
    super do |user|
      user.page_type = params[:user][:page_type]
      if user.page_type == "celebrity"
        # Check if the name exists in scraped_celebrities
        celebrity = ScrapedCelebrity.find_by(name: params[:user][:celebrity_name])
        if celebrity
          # Verify via social media (simplified for now)
          user.social_media_links = params[:user][:social_media_links]
          user.follower_count = fetch_follower_count(user.social_media_links)
          user.badge = user.follower_count >= 300_000 ? "internet_famous" : nil
        else
          user.page_type = "fan"
          Notification.create(user: user, message: "Your account is set as a fan account until your celebrity status is verified.")
        end
      else
        # Check if fan might be a celebrity
        user.social_media_links = params[:user][:social_media_links]
        user.follower_count = fetch_follower_count(user.social_media_links)
        if user.follower_count >= 300_000
          user.badge = "internet_famous"
          Notification.create(user: user, message: "We detected you might be internet famous! Your page now has an internet famous badge.")
        end
      end
      user.save
    end
  end

  private

  def fetch_follower_count(social_media_links)
    # Simplified: In production, use social media APIs to fetch follower counts
    return 0 unless social_media_links
    # Example: Fetch from Twitter API (pseudo-code)
    # response = TwitterAPI.get_follower_count(social_media_links["twitter"])
    # return response.followers_count
    0
  end
end
