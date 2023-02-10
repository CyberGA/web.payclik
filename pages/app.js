import DashboardContainer from "@/containers/dashboard";
import PaymentProvider from "@/contexts/payment";

export default function Dashboard() {
  return (
    <PaymentProvider>
      <DashboardContainer />
    </PaymentProvider>
  );
}

Dashboard.title = "App | PayClik";
