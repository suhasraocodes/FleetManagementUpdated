import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const Register = () => {
    const { currentUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match.');
                setIsRegistering(false);
                return;
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {currentUser && (<Navigate to={'/'} replace={true} />)}

            <main className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">Create a New Account</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">Please fill in the details to create your account.</p>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <div className="flex flex-col space-y-2 w-full">
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" placeholder="" type="text" />
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" placeholder="" type="text" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 dark:text-red-400 text-center">{errorMessage}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full mt-4 ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium rounded-lg py-2`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </Button>

                        <div className="text-sm text-center mt-4">
                            Already have an account?{' '}
                            <Link to={'/login'} className="text-indigo-600 hover:underline dark:text-indigo-400">Login</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
