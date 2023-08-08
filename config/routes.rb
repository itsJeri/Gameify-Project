Rails.application.routes.draw do
  scope '/api/v1' do
    resources :scores, only: [:index, :show, :create]
    resources :games, only: [:index, :show]
    resources :users, only: [:index]

    LOGIN_API_ROUTE = '/login'
    LOGOUT_API_ROUTE = '/logout'
    SIGNUP_API_ROUTE = '/signup'
    CURRENT_USER_API_ROUTE =  '/me'
    USER_PROFILES_API_ROUTE = '/profiles'
    LEADERBOARDS_API_ROUTE = '/leaderboards'

    # SESSIONS
    post LOGIN_API_ROUTE, to: 'sessions#create'
    delete LOGOUT_API_ROUTE, to: 'sessions#destroy'

    # USERS
    post SIGNUP_API_ROUTE, to: 'users#create'
    get CURRENT_USER_API_ROUTE, to: 'users#show'

    # USER STATS
    get USER_PROFILES_API_ROUTE + '/:id', to: 'users#show_stats'

    # LEADERBOARDS
    get LEADERBOARDS_API_ROUTE, to: 'games#leaderboards_index'
    get LEADERBOARDS_API_ROUTE + '/:id', to: 'games#leaderboards_show'
  end

  # FOR DEPLOYMENT
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
