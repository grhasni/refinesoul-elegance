import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isSignUp) {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse({ email: formData.email, password: formData.password });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign up failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account created',
            description: 'Welcome to RefineSoul! You are now logged in.',
          });
          navigate('/dashboard');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: 'Sign in failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back',
            description: 'You have successfully signed in.',
          });
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              <span className="text-primary">Refine</span>Soul
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-12 h-12 bg-accent/50 border-border focus:border-primary"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                )}
              </motion.div>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-12 bg-accent/50 border-border focus:border-primary"
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 h-12 bg-accent/50 border-border focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                }}
                className="ml-2 text-primary hover:underline font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Image/Brand */}
      <div className="hidden lg:flex flex-1 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-semibold text-foreground mb-6">
              Embrace Elegance
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Discover our curated collection of premium abayas designed to celebrate modesty with modern sophistication.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary/30 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
