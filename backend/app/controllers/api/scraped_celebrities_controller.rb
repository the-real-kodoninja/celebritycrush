class Api::ScrapedCelebritiesController < ApplicationController
  def index
    @celebrities = ScrapedCelebrity.all
    render json: @celebrities
  end

  def create
    @celebrity = ScrapedCelebrity.new(celebrity_params)
    if @celebrity.save
      render json: @celebrity, status: :created
    else
      render json: @celebrity.errors, status: :unprocessable_entity
    end
  end

  private

  def celebrity_params
    params.require(:scraped_celebrity).permit(:name)
  end
end
