import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import { Input } from "mdbreact";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  // When the user selects an autocomplete suggestion...
  handleSelect = address => {
    // Pull in the setFormLocation function from the parent ReportForm
    const setFormLocation = this.props.setFormLocation;
    this.setState({ address });
    geocodeByAddress(address)
      .then(function(results) {
        // Set the location in the parent ReportFrom
        setFormLocation(results[0].formatted_address);
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    const renderInput = ({
      getInputProps,
      getSuggestionItemProps,
      suggestions
    }) => (
      <div className="form-control mdb-autocomplete">
        <input className="place_search" {...getInputProps()} />

        {suggestions.map(suggestion => (
          <div
            className="pac-item"
            {...getSuggestionItemProps(suggestion)}
            className="suggestion"
          >
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
    );

    const searchOptions = {
      types: ["(cities)"]
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        // Pass the search options prop
        searchOptions={searchOptions}
      >
        {renderInput}
      </PlacesAutocomplete>
    );
  }
}

export default SearchBar;
