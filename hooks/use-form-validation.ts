import { useState, useEffect } from 'react';

interface FormField {
  value: string;
  required?: boolean;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

interface FormFields {
  [key: string]: FormField;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    [key: string]: string;
  };
}

/**
 * Custom hook for form validation
 */
export function useFormValidation(initialFields: FormFields) {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update a field value
  const updateField = (fieldName: string, value: string) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value
      }
    }));
  };

  // Mark a field as touched when user interacts with it
  const touchField = (fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  // Validate all fields
  const validateForm = (): ValidationResult => {
    const errors: {[key: string]: string} = {};
    let isValid = true;

    Object.entries(fields).forEach(([fieldName, field]) => {
      // Check if required field is empty
      if (field.required && !field.value.trim()) {
        errors[fieldName] = field.errorMessage || 'This field is required';
        isValid = false;
      } 
      // Check custom validator if provided and field has a value
      else if (field.validator && field.value.trim() && !field.validator(field.value)) {
        errors[fieldName] = field.errorMessage || 'Invalid value';
        isValid = false;
      }
    });

    return { isValid, errors };
  };

  // Mark form as submitted
  const submitForm = () => {
    setIsSubmitted(true);
    return validateForm();
  };

  // Get validation result for a specific field
  const getFieldError = (fieldName: string): string | null => {
    if (!touched[fieldName] && !isSubmitted) return null;
    
    const field = fields[fieldName];
    if (!field) return null;
    
    if (field.required && !field.value.trim()) {
      return field.errorMessage || 'This field is required';
    }
    
    if (field.validator && field.value.trim() && !field.validator(field.value)) {
      return field.errorMessage || 'Invalid value';
    }
    
    return null;
  };

  return {
    fields,
    updateField,
    touchField,
    validateForm,
    submitForm,
    getFieldError,
    isValid: validateForm().isValid
  };
}