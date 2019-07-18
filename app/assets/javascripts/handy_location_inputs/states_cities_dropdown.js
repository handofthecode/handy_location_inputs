document.addEventListener("turbolinks:load", function(){
  if(!document.querySelector('.address_js_active')) return;

  var countryInput = document.getElementById("country-input");
  var countryDropdown = document.querySelector('.country-dropdown');
  var countryDropdownContent = document.querySelector('.country-dropdown-content')

  var stateInput = document.getElementById("state-input");
  var stateDropdown = document.querySelector('.state-dropdown');
  var stateDropdownContent = document.querySelector('.state-dropdown-content')

  var cityInput = document.getElementById("city-input");
  var cityDropdown = document.querySelector('.city-dropdown');
  var cityDropdownContent = document.querySelector('.city-dropdown-content')

  class DropdownController {
    constructor(type, input, dropdown, dropdownContent) {
      this.type = type;
      this.input = input;
      this.dropdown = dropdown;
      this.dropdownContent = dropdownContent;
      this.setPlaces();
      this.addAllEventListeners();
    }

    addAllEventListeners() {
      this.addInputListener();
      this.addClickListener();
      this.addBlurInputListener();
      this.addFocusListener();
      this.addClearSubordinateInputsListener();
    }

    addClearSubordinateInputsListener() {
      this.input.addEventListener('change', () => this.clearSubordinateInputs());
    }

    addClickListener() {
      this.dropdown.addEventListener('click', e => {
        this.input.value = e.target.innerText;
        var nextInput = this.subordinateInputs()[0];
        if(nextInput) {
          this.ajaxCallForSubordinateInput();
          nextInput.focus();
        }
      });
    }

    subordinateInputs() {
      var result;
      if(this.type === 'countries') {
        result = [stateInput, cityInput];
      } else if(this.type === 'states') {
        result = [cityInput];
      } else {
        result = [];
      }
      return result
    }

    subordinateInputType() {
      if(this.type === 'countries') {
        return 'states';
      } else if(this.type === 'states') {
        return 'cities';
      } else return null;
    }

    superiorController() {
      if(this.type === 'states') return countryDropdownController;
      if(this.type === 'cities') return stateDropdownController;
    }

    clearSubordinateInputs() {
      this.subordinateInputs().forEach(input => input.value = '');
    }

    inputIsValid() {
      return this.input.value && 
        gon[this.type] &&
        this.inputWithProperCase();
    }

    inputWithProperCase() {
      return this.places.find(place => place.toLowerCase() === this.input.value.toLowerCase())
    }

    fixCase() {
      if(this.inputWithProperCase()) {
        this.input.value = this.inputWithProperCase();
      }
    }

    ajaxCallForSubordinateInput() {
      if(!this.inputIsValid()) return;
      if(this.type === 'cities') return;
      var url;
      var data;
      if(this.type === 'countries') {
        url = "/HandyLocationInputs/states.json";
        data = `country=${this.inputWithProperCase()}`;
      } else if(this.type === 'states') {
        url = "/HandyLocationInputs/cities.json";
        data = `country=${countryDropdownController.inputWithProperCase()}&state=${this.inputWithProperCase()}`
      }
      Rails.ajax({
        dataType: "json",
        url: url,
        type: "POST",
        data: data,
        beforeSend: () => true,
        success: (data) => {
          gon[this.subordinateInputType()] = data[this.subordinateInputType()];
        },
      });
    }

    addBlurInputListener() {
      this.input.addEventListener('blur', () => {
        this.fixCase();
        this.ajaxCallForSubordinateInput();
        setTimeout(() => {
          this.dropdown.classList.remove('is-active');
        }, 300)
      });
    }

    addFocusListener() {
      this.input.addEventListener('focus', () => {
        if(!this.superiorController()) {
          this.input.dispatchEvent(new Event('keyup'));
        } else if(this.superiorController().inputIsValid()) {
          setTimeout(() => {
            this.input.dispatchEvent(new Event('keyup'))
          }, 1000)
        } else {
          this.superiorController().input.focus()
        }
      });
    }

    setPlaces() {
      this.places;
      if(gon) {
        if(this.type === 'countries') {
          this.places = gon.countries;
        } else if(this.type === 'states') {
          this.places = gon.states;
        } else if(this.type === 'cities') {
          this.places = gon.cities;
        }
      }
      if(!this.places || !this.places.length) return;
    }
    
    addInputListener() {
      this.input.addEventListener("keyup", () => {
        var inputValLower = this.input.value.toLowerCase();
        this.dropdown.classList.add('is-active');
        this.setPlaces();
        this.matching = this.places.filter(c => c.toLowerCase().slice(0, inputValLower.length) == (inputValLower)).slice(0, 5);
        if(this.dropdownContent.firstChild) {
          while (this.dropdownContent.firstChild) {
            this.dropdownContent.removeChild(this.dropdownContent.firstChild);
          }
        }
        this.matching.forEach((c) => {
          let item = document.createElement("div");
          item.className = 'dropdown-item';
          item.innerText = c;
          this.dropdownContent.appendChild(item)
        });
      });
    }
  }

  countryDropdownController = new DropdownController('countries', countryInput, countryDropdown, countryDropdownContent)
  stateDropdownController = new DropdownController('states', stateInput, stateDropdown, stateDropdownContent)
  cityDropdownController = new DropdownController('cities', cityInput, cityDropdown, cityDropdownContent)
});
