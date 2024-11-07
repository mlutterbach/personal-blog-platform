Rails.application.routes.draw do
  root "articles#index"

  resources :articles
  resources :projects, except: :show
  get '/users', to: 'users#index'
  get '/users/me', to: 'users#me'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :contacts, only: [:create]
    end
  end
end
