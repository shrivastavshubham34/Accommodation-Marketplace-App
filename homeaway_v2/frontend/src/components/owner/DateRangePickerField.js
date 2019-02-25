import React, { PureComponent } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class DateRangePickerField extends PureComponent {
  state = { focusedInput: null };
  handleFocusChange = focusedInput => this.setState({ focusedInput });

  render() {
    const {
      meta: { error, touched },
      input: {
        value: { startDate = null, endDate = null },
        onChange
      }
    } = this.props;
    const { focusedInput = null } = this.state;

    return (
      <div>
        <DateRangePicker
          endDateId="endDate"
          endDate={endDate}
          endDatePlaceholderText="End Date"
          focusedInput={focusedInput}
          onDatesChange={onChange}
          onFocusChange={this.handleFocusChange}
          startDateId="startDate"
          startDate={startDate}
          startDatePlaceholderText="Start Date"
        />
        {error && touched && <span>{error}</span>}
      </div>
    );
  }
}
export default DateRangePickerField;
