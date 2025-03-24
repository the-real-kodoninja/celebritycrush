class Api::CelebritiesController < ApplicationController
    def index
      @celebrities = Celebrity.all
      render json: @celebrities
    end
  
    def show
      @celebrity = Celebrity.find(params[:id])
      render json: @celebrity
    end
  end