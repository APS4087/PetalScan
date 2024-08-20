// function to get custom error message based on error code
export const getCustomErrorMessage = (error) => {
  switch (error.code) {
    // Login Errors
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "This account has been disabled by an administrator.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Please try again later.";
    case "auth/operation-not-allowed":
      return "Email and password login is not enabled. Please contact support.";

    // Registration Errors
    case "auth/email-already-in-use":
      return "This email address is already in use. Please use a different email or login.";
    case "auth/weak-password":
      return "Your password is too weak. Please choose a stronger password.";
    case "auth/invalid-password":
      return "The password you entered is invalid. Please try again.";
    case "auth/missing-email":
      return "Please enter your email address.";
    case "auth/missing-password":
      return "Please enter your password.";

    // Default case for unexpected errors
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
