import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripePromise = loadStripe(environment.stripePublicKey);  

  constructor(private http: HttpClient) {}

  async pay(amount: number, currency: string, description: string) {
    const paymentData = { amount, currency, description };
    
    const response = await this.http.post<{ sessionId: string }>('/api/payment/create-checkout-session', paymentData).toPromise();
    
    const stripe = await this.stripePromise;
    if (!stripe) {
        console.error("Stripe.js nije učitan");
        return;
    }
    if (!response || !response.sessionId) {
        console.error("Odgovor je nevalidan ili sessionId nedostaje");
        return;
      }
    const result = await stripe.redirectToCheckout({
      sessionId: response.sessionId
    });

    if (result.error) {
      console.error(result.error.message);
    }
  }
}
