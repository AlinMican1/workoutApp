
import React from 'react';

interface InputFieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error: boolean;
    
    errorMessage: string;
  }


function InputField({ name, value, onChange, placeholder, error, errorMessage }: InputFieldProps) {

    return (
      <div className="mb-2">
        <input
          className={`p-2 w-full h-10 text-lg rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
          }`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    );
  }
  
  export default InputField;