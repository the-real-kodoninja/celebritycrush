class Admin::LicensesController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_admin

  def index
    @licenses = License.where(approved: false)
    render json: @licenses
  end

  def approve
    @license = License.find(params[:id])
    @license.update(approved: true)
    Notification.create(user: @license.user, message: "Your license for #{@license.celebrity_name} has been approved!")
    render json: @license
  end

  def reject
    @license = License.find(params[:id])
    @license.update(approved: false)
    Notification.create(user: @license.user, message: "Your license for #{@license.celebrity_name} was rejected.")
    render json: @license
  end

  private

  def ensure_admin
    unless current_user.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
