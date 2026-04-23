'use client';

import { useState } from 'react';
import { useAuthContext } from '../auth/auth-context';
import { useTranslations } from 'next-intl';
import { transKeys } from '@/i18n/keys';
import { Button } from '@onlook/ui/button';
import { Input } from '@onlook/ui/input';
import { Label } from '@onlook/ui/label';
import { Icons } from '@onlook/ui/icons';
import { toast } from 'sonner';
import { SignInMethod } from '@onlook/models/auth';

export const EmailLoginForm = ({ returnUrl }: { returnUrl: string | null }) => {
    const t = useTranslations();
    const { handleEmailLogin, handleSignUp, signingInMethod } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const isLoading = signingInMethod === SignInMethod.EMAIL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await handleSignUp(email, password, returnUrl);
                toast.success('Check your email for the confirmation link');
            } else {
                await handleEmailLogin(email, password, returnUrl);
            }
        } catch (error) {
            toast.error(isSignUp ? 'Error signing up' : 'Error signing in', {
                description: error instanceof Error ? error.message : 'Please try again.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-2">
                <Label htmlFor="email">{t(transKeys.welcome.login.emailPlaceholder)}</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">{t(transKeys.welcome.login.passwordPlaceholder)}</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <Icons.LoadingSpinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    isSignUp ? t(transKeys.welcome.login.signUp) : t(transKeys.welcome.login.signIn)
                )}
            </Button>
            <div className="text-center">
                <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-small text-foreground-onlook hover:underline"
                    disabled={isLoading}
                >
                    {isSignUp 
                        ? 'Already have an account? Sign In' 
                        : "Don't have an account? Sign Up"}
                </button>
            </div>
        </form>
    );
};
