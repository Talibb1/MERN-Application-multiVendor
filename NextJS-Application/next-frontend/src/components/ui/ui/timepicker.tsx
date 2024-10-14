import React from "react";
import { Controller, Control } from "react-hook-form";
import { TimePicker as AntTimePicker } from "antd"; 


interface TimePickerProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  ariaInvalid?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ name, control, placeholder, ariaInvalid }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AntTimePicker
          {...field}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          format="HH:mm" 
          style={{ width: '100%' }} 
          onChange={(time, timeString) => field.onChange(timeString)} 
        />
      )}
    />
  );
};

export default TimePicker;
