"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import PageViewTracker from "@/components/common/PageViewTracker";
import CookieConsent from "@/components/common/CookieConsent";
import WhatsAppSupport from "@/components/common/WhatsAppSupport";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PageViewTracker />
      {children}
      <WhatsAppSupport />
      <CookieConsent />
    </Provider>
  );
}
