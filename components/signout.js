import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOutUser } from 'lib/auth';

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      await signOutUser(); // Ensure sign out works
      router.push('/'); // Redirect to home after sign out
    };

    signOut();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-700">Signing you out...</p>
    </div>
  );
};

export default SignOutPage;
