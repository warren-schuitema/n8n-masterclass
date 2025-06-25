'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  CheckCircle, 
  Calendar, 
  Download, 
  Mail,
  Clock,
  Users,
  Share2,
  ArrowRight
} from 'lucide-react';
import { 
  createGoogleCalendarLink, 
  createOutlookCalendarLink, 
  downloadICSFile,
  type CalendarEvent 
} from '@/lib/calendar';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(searchParams.get('session_id'));
  }, [searchParams]);

  const masterclassEvent: CalendarEvent = {
    title: 'N8N Automations Masterclass',
    description: `Join us for an intensive 3-hour session covering:
- N8N Fundamentals & Setup
- Advanced Workflows & Integrations  
- AI Agent Creation & Deployment

Zoom link and materials will be sent 24 hours before the event.

Questions? Contact support@n8nmasterclass.com`,
    startDate: new Date('2025-07-24T19:00:00.000Z'), // 3 PM EST
    endDate: new Date('2025-07-24T22:00:00.000Z'),   // 6 PM EST
    location: 'Online via Zoom'
  };

  const handleGoogleCalendar = () => {
    window.open(createGoogleCalendarLink(masterclassEvent), '_blank');
  };

  const handleOutlookCalendar = () => {
    window.open(createOutlookCalendarLink(masterclassEvent), '_blank');
  };

  const handleDownloadICS = () => {
    downloadICSFile(masterclassEvent);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'N8N Automations Masterclass',
          text: 'I just registered for an amazing N8N Automations Masterclass! Join me on July 24th.',
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

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
              <Link href="/dashboard">
                <Button variant="outline">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Celebration Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              🎉 Payment Successful!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              Welcome to the N8N Automations Masterclass
            </p>
            
            <p className="text-lg">
              You're all set for <strong>July 24, 2025 at 3:00 PM EST</strong>
            </p>
            
            {sessionId && (
              <p className="text-sm text-muted-foreground mt-2">
                Order ID: {sessionId.slice(-8)}
              </p>
            )}
          </div>

          {/* Event Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-500" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">
                        July 24, 2025 • 3:00 PM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-sm text-muted-foreground">
                        Live Online Workshop via Zoom
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">What's Next</p>
                      <p className="text-sm text-muted-foreground">
                        Zoom link sent 24 hours before event
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Materials</p>
                      <p className="text-sm text-muted-foreground">
                        Course materials & recording included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Integration */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Add to Your Calendar</h3>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleGoogleCalendar} variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Google Calendar
                  </Button>
                  
                  <Button onClick={handleOutlookCalendar} variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Outlook
                  </Button>
                  
                  <Button onClick={handleDownloadICS} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download .ics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You'll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>3-hour intensive live training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Complete course materials & templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Full session recording (lifetime access)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Live Q&A with expert instructor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Hands-on exercises & real examples</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Private community access</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Message */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">AE</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">A Message from Alex Expert</h3>
                  <p className="text-muted-foreground mb-4">
                    "Welcome to the masterclass! I'm excited to share everything I've learned about N8N 
                    automations over the past 8 years. You've made a great investment in your automation 
                    skills, and I promise you'll leave with practical knowledge you can apply immediately."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Have questions before the event? Feel free to reach out at alex@n8nmasterclass.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Know someone who'd benefit?</h3>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share This Course
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Help a colleague level up their automation skills
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-muted-foreground">
              Questions or need support?{' '}
              <a 
                href="mailto:support@n8nmasterclass.com" 
                className="text-primary hover:underline"
              >
                support@n8nmasterclass.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}