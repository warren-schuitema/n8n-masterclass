'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/countdown-timer';
import { ThemeToggle } from '@/components/theme-toggle';
import { useCountdown } from '@/hooks/use-countdown';
import { supabase } from '@/lib/supabase';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  Star, 
  Zap, 
  Brain, 
  Target,
  ArrowRight,
  Calendar,
  Globe,
  Award
} from 'lucide-react';

export default function Home() {
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { isExpired } = useCountdown('2025-07-20T23:59:59');

  // Set pricing based on countdown
  const currentPrice = isExpired ? 397 : 297;
  const originalPrice = 397;

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">N8N Masterclass</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Calendar className="h-4 w-4 mr-2" />
                July 24, 2025 • 3-6PM EST
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Master N8N Automations in 
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {' '}One Intensive Session
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From Beginner to Advanced + AI Agent Creation. Join 2,847+ automation professionals 
              who've transformed their workflows with N8N.
            </p>

            <div className="flex flex-col items-center space-y-6 mb-12">
              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>2,847+ Students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>50+ Countries</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="w-full max-w-md">
                <CountdownTimer 
                  targetDate="2025-07-20T23:59:59"
                  onExpired={() => setIsEarlyBird(false)}
                />
              </div>

              {/* Main CTA */}
              <div className="flex flex-col items-center space-y-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/signup">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                      Get Started - ${currentPrice}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                
                <div className="text-center text-sm text-muted-foreground">
                  {!isExpired && (
                    <p className="text-green-600 font-medium">
                      💰 Save $100 with Early Bird Pricing
                    </p>
                  )}
                  <p>Limited to 50 participants • Secure payment via Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What You'll Master in 3 Hours</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive curriculum designed to take you from N8N beginner to advanced practitioner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Module 1</h3>
                  <p className="text-sm text-muted-foreground">Foundation</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">N8N Fundamentals & Setup</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  N8N installation and configuration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Understanding nodes and connections
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Building your first automation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Best practices and debugging
                </li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Module 2</h3>
                  <p className="text-sm text-muted-foreground">Advanced</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Advanced Workflows & Integrations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Complex workflow design patterns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  API integrations and webhooks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Data transformation and manipulation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Error handling and monitoring
                </li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Module 3</h3>
                  <p className="text-sm text-muted-foreground">AI Agents</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">AI Agent Creation & Deployment</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Building intelligent automation agents
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  LLM integration and prompt engineering
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Decision trees and conditional logic
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Production deployment strategies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Bio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Your Instructor</h2>
              <p className="text-xl text-muted-foreground">
                Learn from an automation expert with 8+ years of experience
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">AE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Certified Expert</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">5,000+ Students</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-2xl font-bold">Alex Expert</h3>
                  <p className="text-lg text-muted-foreground">
                    Senior Automation Architect & N8N Specialist
                  </p>
                  
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      With over 8 years in automation and workflow optimization, Alex has helped 
                      hundreds of companies streamline their operations using N8N and other automation tools.
                    </p>
                    <p>
                      Previously Lead Automation Engineer at TechCorp, Alex has built enterprise-grade 
                      automation solutions handling millions of operations daily.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      N8N Expert
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      AI Integration
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      Enterprise Solutions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Don't Miss This Opportunity
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the most comprehensive N8N training available. Limited to 50 participants 
            for personalized feedback and Q&A.
          </p>

          <div className="bg-card rounded-xl p-8 shadow-lg mb-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold">3-Hour Intensive</p>
                <p className="text-sm text-muted-foreground">Packed with actionable content</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold">Small Group</p>
                <p className="text-sm text-muted-foreground">Max 50 participants</p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="text-3xl font-bold">${currentPrice}</span>
              {!isExpired && (
                <span className="text-xl text-muted-foreground line-through">${originalPrice}</span>
              )}
            </div>

            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                  Secure Your Spot Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              30-day money-back guarantee • Secure payment via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 N8N Masterclass. All rights reserved.</p>
            <p className="mt-2">
              Questions? Email us at{' '}
              <a href="mailto:support@n8nmasterclass.com" className="text-primary hover:underline">
                support@n8nmasterclass.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}