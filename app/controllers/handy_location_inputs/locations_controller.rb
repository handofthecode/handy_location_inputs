module HandyLocationInputs
  class LocationsController < ApplicationController
    protect_from_forgery with: :exception

    include HandyLocationInputs::Locatable
  
    skip_around_action :set_time_zone
    skip_before_action :require_user, :require_village
  
    def states
      respond_to do |format|
        format.json {render json: { states: CS.states(country_key).values }}
      end
    end
  
    def cities
      respond_to do |format|
        format.json {render json: { cities: CS.cities(state_key, country_key)}}
      end
    end
  
    def country_key
      CS.countries.key(params[:country])
    end
  
    def state_key
      return_key(CS.states(country_key), params[:state])
    end
  end
end
