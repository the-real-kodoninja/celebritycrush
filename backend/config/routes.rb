Rails.application.routes.draw do
  devise_for :users, controllers: { 
    registrations: "users/registrations",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
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
    resources :marketplace_items, only: [:index, :create] do
      member do
        post :approve
      end
      resources :reviews, only: [:create]
    end
    resources :licenses, only: [:create] do
      member do
        post :approve
      end
    end
    resources :payments, only: [:create]
    resources :conversations, only: [:index, :show, :create] do
      resources :messages, only: [:index, :create]
    end
  end
  namespace :admin do
    resources :marketplace_items, only: [:index] do
      member do
        post :approve
        post :reject
      end
    end
    resources :licenses, only: [:index] do
      member do
        post :approve
        post :reject
      end
    end
  end
end
