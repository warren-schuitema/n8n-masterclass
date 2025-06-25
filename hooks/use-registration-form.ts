// Custom hook for multi-step registration form management
// Created: Registration form state management hook

'use client';

import { useState } from 'react';

export interface FormData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  automation_experience: string;
  course_goal: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    automation_experience: '',
    course_goal: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.full_name.trim()) {
        newErrors.full_name = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    if (step === 2) {
      if (!formData.automation_experience) {
        newErrors.automation_experience = 'Please select your experience level';
      }
      if (!formData.course_goal) {
        newErrors.course_goal = 'Please select your primary goal';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      return true;
    }
    return false;
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return {
    currentStep,
    formData,
    errors,
    nextStep,
    prevStep,
    updateFormData,
    validateStep
  };
};