import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App';

const paypalOptions = {
  "client-id": "ARv2vziyGxOho1ArMXZ3p0yB1pHtaFLSQAGnhyzLrp3OGfMJnjzNXQYnPW9rLXDK4r7agi1f7KiWtjAp",
  currency: "USD",
  intent: "capture",
  "data-client-token": "YOUR_SANDBOX_CLIENT_TOKEN",
};

ReactDOM.render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalOptions}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>,
  document.getElementById('root')
);