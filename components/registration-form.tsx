// Multi-step registration form component
// Created: Complete 3-step registration form with validation

'use client';

import { useState } from 'react';
import { useRegistrationForm } from '@/hooks/use-registration-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, CreditCard } from 'lucide-react';

interface RegistrationFormProps {
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

export function RegistrationForm({ onSubmit, isLoading }: RegistrationFormProps) {
  const { currentStep, formData, errors, nextStep, prevStep, updateFormData } = useRegistrationForm();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = () => {
    if (currentStep === 3 && acceptedTerms) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of 3
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((currentStep / 3) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Let's Get Started</h2>
            <p className="text-muted-foreground">
              Tell us a bit about yourself to personalize your experience
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => updateFormData('full_name', e.target.value)}
                placeholder="Enter your full name"
                className={errors.full_name ? 'border-red-500' : ''}
              />
              {errors.full_name && (
                <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email address"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Company Name (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={nextStep}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Course Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Course Preferences</h2>
            <p className="text-muted-foreground">
              Help us tailor the content to your needs
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">
                What's your current automation experience level? *
              </Label>
              <Select
                value={formData.automation_experience}
                onValueChange={(value) => updateFormData('automation_experience', value)}
              >
                <SelectTrigger className={errors.automation_experience ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to automation</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some automation experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced with automation tools</SelectItem>
                  <SelectItem value="expert">Expert - Building complex automation systems</SelectItem>
                </SelectContent>
              </Select>
              {errors.automation_experience && (
                <p className="text-sm text-red-500 mt-1">{errors.automation_experience}</p>
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">
                What's your primary goal for taking this course? *
              </Label>
              <RadioGroup
                value={formData.course_goal}
                onValueChange={(value) => updateFormData('course_goal', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="learn-n8n" id="learn-n8n" />
                  <Label htmlFor="learn-n8n">Learn N8N from scratch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improve-workflows" id="improve-workflows" />
                  <Label htmlFor="improve-workflows">Improve existing workflows</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="build-agents" id="build-agents" />
                  <Label htmlFor="build-agents">Build AI agents and advanced automations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business-automation" id="business-automation" />
                  <Label htmlFor="business-automation">Automate business processes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="career-development" id="career-development" />
                  <Label htmlFor="career-development">Career development and new skills</Label>
                </div>
              </RadioGroup>
              {errors.course_goal && (
                <p className="text-sm text-red-500 mt-1">{errors.course_goal}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={nextStep}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Summary */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Complete Your Registration</h2>
            <p className="text-muted-foreground">
              Review your information and complete payment
            </p>
          </div>

          {/* Course Summary */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">Course Summary</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Course:</strong> N8N Automations: From Beginner to Advanced + Agent Creation</p>
              <p><strong>Date:</strong> July 24, 2025</p>
              <p><strong>Time:</strong> 3:00 PM - 6:00 PM EST</p>
              <p><strong>Format:</strong> Live Online Workshop (Zoom)</p>
              <p><strong>Includes:</strong> 3-hour intensive training, course materials, recording access</p>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-2">
            <h3 className="font-semibold text-lg mb-3">Your Information</h3>
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {formData.full_name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
              <p><strong>Experience:</strong> {formData.automation_experience}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Early Bird Price</p>
                <p className="text-sm text-muted-foreground">Save $100 off regular price</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$297</p>
                <p className="text-sm text-muted-foreground line-through">$397</p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions and refund policy *
            </Label>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!acceptedTerms || isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now - $297
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}