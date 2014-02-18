Homeapp::Application.routes.draw do
  root to: "root#index"
  resources :root, :only => [:index] do 
  	get :download
  end
  resources :asteroids
end
