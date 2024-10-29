
import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51PqcoZ02NreM1WYkLRPFojj6z3yvq5t52SEg8k7Hehvp3p5zjZTP6EUwgCVwhPu8bX73WGFvn4gkz4Sxeq6xLbgN00idThZEaN'; // Replace with your actual publishable key

const StripeWrapper = ({ children }) => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      {children}
    </StripeProvider>
  );
};

export default StripeWrapper;
