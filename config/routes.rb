Rails.application.routes.draw do
  resources :scores, only: [:index, :create, :destroy]
  resources :games, only: [:index, :show]

  # SESSIONS
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # USERS
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
