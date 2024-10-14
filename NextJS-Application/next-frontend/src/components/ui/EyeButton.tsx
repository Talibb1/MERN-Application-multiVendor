"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

interface EyeButtonProps {
  inputId: string;
  register: any;
  errors: any;
  placeholder?: string;
}

const EyeButton: React.FC<EyeButtonProps> = ({ inputId, register, errors, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        id={inputId}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register(inputId, { required: true })}
        className={`block w-full rounded-md border ${errors[inputId] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEye /> : <RiEyeCloseLine />}
      </button>
    </div>
  );
};

export default EyeButton;
