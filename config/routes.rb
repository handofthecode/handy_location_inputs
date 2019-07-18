HandyLocationInputs::Engine.routes.draw do
  post 'states', to: 'locations#states'
  post 'cities', to: 'locations#cities'
end
