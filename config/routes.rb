Rails.application.routes.draw do
  root "articles#index"

  resources :articles

  namespace :api do
    namespace :v1 do
      resources :contacts, only: [:create]
    end
  end
end
