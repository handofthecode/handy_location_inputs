# Handy Location Inputs
Handy Location Inputs is a rails gem/engine for adding powerful location inputs to your forms. It allows you to guarentee your Country, State, and City names will be uniform without the UX penalties of Select Boxes.

## Requirements
Rails with turbolinks and bulma css. (Future versions will remove the dependency on Bulma.)

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'handy_location_inputs'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install handy_location_inputs
```

## Setup

First, add this line to your app/assets/javascripts/application.js manifest file.

```javascript
// = require handy_location_inputs/input_controllers
```

Add Gon to your Gemfile ```gem "gon"``` and add ```<%= include_gon %>``` to the head tag of your application.

To use handy_location_inputs in a view, ```include HandyLocationInputs::Locatable``` to that view's controller.

If the associated model is new, or has no location data yet, call ```country_list_to_client``` to the controller action. This will pass the country list to the client.

If the model already has state and city data that you would like to pass to the client as well, call ```location_lists_to_client(your_model)```.

### In The View

To trigger functionality in a form, include the class ```handy-location-inputs``` somewhere on the page.

Each input needs an id of ```country-input```, ```state-input```, or ```city-input``` respectively.

The dropdown for each input should look like this.

```html
<div class="dropdown country-dropdown">
  <div class="dropdown-menu" role="menu">
    <div class="country-dropdown-content">
    </div>
  </div>
</div>
```

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
