module HandyLocationInputs
  module Locatable
    extend ActiveSupport::Concern

    private

    def country_list_to_client
      countries = CS.countries.map { |c| c[1] }.sort
      countries.delete("country_name")
      countries.delete("United States")
      countries.unshift("United States")
      gon.countries = countries
    end

    def location_lists_to_client(model)
      country_list_to_client
      gon.states = CS.states(country_key model).values if !model[:country].blank?
      gon.cities = CS.cities(state_key(model), country_key(model)) if !model[:state].blank?
    end

    def valid_location?(model)
      return false if state_key(model).blank?
      return false if !CS.cities(state_key(model), country_key(model)).blank? &&
        CS.cities(state_key(model), country_key(model)).map(&:downcase).exclude?(model[:city].downcase)
      true
    end

    def country_key(model)
      @country_key ||= CS.countries.key(model[:country])
    end

    def state_key(model)
      @state_key ||= return_key(CS.states(country_key(model)), model[:state])
    end

    def return_key(obj, match)
      obj.each {|key, val| break key if key.to_s == match || val == match}
    end
  end
end
