import React, { useState } from 'react';
import { DateTimePicker } from '@mui/lab';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function DatePickerComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState('week');

  const handleStartDateChange = (date) => {
    setStartDate(date);
    updateEndDate(date, duration);
  };

  const handleDurationChange = (event) => {
    const newDuration = event.target.value;
    setDuration(newDuration);
    updateEndDate(startDate, newDuration);
  };

  const updateEndDate = (start, duration) => {
    const newEndDate = new Date(start);
    if (duration === 'week') {
      newEndDate.setDate(newEndDate.getDate() + 7);
    } else if (duration === 'twoWeeks') {
      newEndDate.setDate(newEndDate.getDate() + 14);
    }
    setEndDate(newEndDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}  // Optional: Allow manual change
          renderInput={(params) => <TextField {...params} />}
        />
        <FormControl>
          <InputLabel id="duration-select-label">Duration</InputLabel>
          <Select
            labelId="duration-select-label"
            value={duration}
            onChange={handleDurationChange}
          >
            <MenuItem value="week">1 Week</MenuItem>
            <MenuItem value="twoWeeks">2 Weeks</MenuItem>
          </Select>
        </FormControl>
      </div>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;