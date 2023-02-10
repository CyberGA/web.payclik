

import PreviewPaymentContainer from '@/containers/preview'
import PaymentProvider from '@/contexts/payment'

export default function PreviewPayment() {
  return (
    <PaymentProvider>
      <PreviewPaymentContainer />
    </PaymentProvider>
  );
}

PreviewPayment.title = "Preview Payment | PayClik"
PreviewPayment.desc = "Confirm the payment that is to be made to another account"