Rails.application.routes.draw do
  namespace :api do
    resources :celebrities, only: [:index, :show], param: :name
    resources :users, only: [:index, :show], param: :username do
      resources :messages, only: [:index, :create]
    end
  end
end
