class Api::CelebritiesController < ApplicationController
  def index
    @celebrities = Celebrity.page(params[:page]).per(50) # Paginate 50 per page
    render json: @celebrities
  end

  def show
    @celebrity = Celebrity.find_by(name: params[:name])
    if @celebrity
      render json: @celebrity
    else
      render json: { error: "Celebrity not found" }, status: :not_found
    end
  end
end
