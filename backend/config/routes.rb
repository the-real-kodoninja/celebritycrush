Rails.application.routes.draw do
  namespace :api do
    resources :scraped_celebrities, only: [:index, :create]
    resources :celebrities, only: [:index, :show]
    resources :fandom_posts, only: [:index, :create, :show] do
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :destroy] do
        resources :replies, only: [:create, :destroy]
      end
      resources :shares, only: [:create, :destroy]
    end
    resources :notifications, only: [:index] do
      member do
        post :mark_as_read
      end
    end
  end

  devise_for :users, controllers: { registrations: "users/registrations" }
end
