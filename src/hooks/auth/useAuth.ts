
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { useSignIn } from "./useSignIn";
import { useSignUp } from "./useSignUp";
import { useSignOut } from "./useSignOut";
import { usePasswordReset } from "./usePasswordReset";
import { useOtpVerification } from "./useOtpVerification";

// Combined hook to maintain the original API surface
export function useAuth() {
  const { session, user, loading } = useAuthContext();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { signOut } = useSignOut();
  const { resetPassword, updatePassword } = usePasswordReset();
  const { resendOTP, verifyOTP } = useOtpVerification();

  return {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resendOTP,
    verifyOTP,
    resetPassword,
    updatePassword
  };
}
