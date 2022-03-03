Rails.application.routes.draw do
  resources :scores, only: [:index, :show, :create]
  resources :games, only: [:index, :show]
  resources :users, only: [:index]

  # SESSIONS
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # USERS
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # USER STATS
  get '/profiles/:id', to: 'users#show_stats'

  # LEADERBOARDS
  get '/leaderboards', to: 'games#leaderboards_index'
  get '/leaderboards/:id', to: 'games#leaderboards_show'

  # FOR DEPLOYMENT
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
