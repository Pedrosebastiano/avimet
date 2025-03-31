import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          onSuccess(details, data);
        });
      }}
      onError={(err) => {
        console.error('PayPal Error:', err);
        alert('There was an error processing your payment. Please try again.');
      }}
    />
  );
};

export default PayPalButton;