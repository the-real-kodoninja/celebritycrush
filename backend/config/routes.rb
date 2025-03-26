Rails.application.routes.draw do
  namespace :api do
    resources :celebrities, only: [:index, :show], param: :name
    resources :users, only: [:index, :show], param: :username do
      resources :messages, only: [:index, :create]
      resources :follows, only: [:index, :create, :destroy]
      resources :lists, only: [:index, :create, :show, :destroy]
    end
    resources :groups, only: [:index, :create, :show] do
      resources :members, only: [:create, :destroy], controller: 'group_members'
    end
    resources :fandom_posts, only: [:index, :create]
  end
end
