class Api::LicensesController < ApplicationController
  before_action :authenticate_user!

  def create
    @license = current_user.licenses.build(license_params)
    if @license.save
      Notification.create(user: current_user, message: "Your license request is pending approval.")
      render json: @license, status: :created
    else
      render json: @license.errors, status: :unprocessable_entity
    end
  end

  def approve
    @license = License.find(params[:id])
    @license.update(approved: true)
    Notification.create(user: @license.user, message: "Your license for #{@license.celebrity_name} has been approved!")
    render json: @license
  end

  private

  def license_params
    params.require(:license).permit(:celebrity_name, :terms)
  end
end

