class AddSocialMetricsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :social_metrics, :jsonb
  end
end
