import React from "react";
import { Controller, Control } from "react-hook-form";
import { DatePicker as AntDatePicker } from "antd"; 

interface DatePickerProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  ariaInvalid?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, control, placeholder, ariaInvalid }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AntDatePicker
          {...field}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          format="YYYY-MM-DD"
          style={{ width: '100%' }}
          onChange={(date, dateString) => field.onChange(dateString)}
        />
      )}
    />
  );
};

export default DatePicker;
