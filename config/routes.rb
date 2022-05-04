Rails.application.routes.draw do

  namespace :api do
    post 'uploads/prepare'
  patch "/me", to: "profiles#upload"

  end
  namespace :api do
  
  resources :trains
  resources :follows
  resources :workout_exercises
  resources :calenders
  resources :personal_records
  resources :workouts
  resources :exercises
  resources :profiles
  resources :users

  get "/user_page/:id", to: "users#find"


  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post '/users/follow/:id', to: "follows#create", as: "follow_user"
  delete '/users/unfollow/:id', to: "follows#destroy", as: "unfollow_user"

  end


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
