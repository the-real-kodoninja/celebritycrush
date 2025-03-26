class Api::CelebritiesController < ApplicationController
  def index
    @celebs = Celebrity.all
    all_data = JSON.parse(File.read(@celebs.first.json_path))
    render json: @celebs.map { |c| { name: c.name, data: all_data.find { |d| d['name'] == c.name } } }
  end

  def show
    @celeb = Celebrity.find_by(name: params[:id])
    all_data = JSON.parse(File.read(@celeb.json_path))
    render json: { name: @celeb.name, data: all_data.find { |d| d['name'] == @celeb.name } } if @celeb
  end
end
