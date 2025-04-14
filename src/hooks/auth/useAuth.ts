
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { useSignIn } from "./useSignIn";
import { useSignUp } from "./useSignUp";
import { useSignOut } from "./useSignOut";
import { usePasswordReset } from "./usePasswordReset";
import { useOtpVerification } from "./useOtpVerification";

// Combined hook to maintain the original API surface
export function useAuth() {
  const { session, user, loading } = useAuthContext();
  const { signIn, isLoading: isSigningIn, error: signInError } = useSignIn();
  const { signUp, isLoading: isSigningUp, error: signUpError } = useSignUp();
  const { signOut, isLoading: isSigningOut, error: signOutError } = useSignOut();
  const { resetPassword, updatePassword, isLoading: isPasswordResetting, error: passwordResetError } = usePasswordReset();
  const { resendOTP, verifyOTP, isLoading: isOtpProcessing, error: otpError } = useOtpVerification();

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
    updatePassword,
    // Also expose loading and error states if components need them
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isPasswordResetting,
    isOtpProcessing,
    signInError,
    signUpError,
    signOutError,
    passwordResetError,
    otpError
  };
}
