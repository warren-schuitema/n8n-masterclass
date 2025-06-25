'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { stripeProducts } from '@/src/stripe-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Zap, 
  LogOut, 
  ShoppingCart, 
  CheckCircle, 
  Clock,
  User,
  CreditCard,
  Package
} from 'lucide-react';

interface User {
  id: string;
  email: string;
}

interface Subscription {
  subscription_status: string;
  price_id: string | null;
}

interface Order {
  order_id: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);
        await fetchUserData(user.id);
      } catch (err) {
        console.error('Error getting user:', err);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [router]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch subscription data
      const { data: subData, error: subError } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id')
        .maybeSingle();

      if (subError && subError.code !== 'PGRST116') {
        console.error('Error fetching subscription:', subError);
      } else {
        setSubscription(subData);
      }

      // Fetch orders data
      const { data: ordersData, error: ordersError } = await supabase
        .from('stripe_user_orders')
        .select('order_id, amount_total, currency, payment_status, order_status, order_date')
        .order('order_date', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(ordersData || []);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handlePurchase = async (priceId: string) => {
    if (!user) return;

    setPurchaseLoading(priceId);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          mode: 'payment',
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/dashboard`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Purchase error:', err);
      setError(err.message || 'Failed to start checkout process');
    } finally {
      setPurchaseLoading(null);
    }
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return null;
    
    const status = subscription.subscription_status;
    const statusColors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      trialing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      past_due: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      incomplete: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };

    return (
      <Badge className={statusColors[status] || statusColors.incomplete}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Manage your courses and subscription from your dashboard.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user?.email}</p>
                  <div className="flex items-center space-x-2">
                    <strong>Subscription Status:</strong>
                    {getSubscriptionStatus() || <span className="text-muted-foreground">No active subscription</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Available Courses
                </CardTitle>
                <CardDescription>
                  Purchase courses to expand your automation skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stripeProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.description}
                          </p>
                          <p className="text-lg font-bold">
                            ${product.price.toFixed(2)} {product.currency}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handlePurchase(product.priceId)}
                        disabled={purchaseLoading === product.priceId}
                        className="w-full"
                      >
                        {purchaseLoading === product.priceId ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Purchase Course
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.order_id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {formatPrice(order.amount_total, order.currency)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(order.order_date)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {order.payment_status === 'paid' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-xs capitalize">
                              {order.order_status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {orders.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        And {orders.length - 5} more orders...
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No orders yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}