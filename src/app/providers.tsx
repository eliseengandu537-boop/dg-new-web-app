"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import PageViewTracker from "@/components/common/PageViewTracker";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PageViewTracker />
      {children}
    </Provider>
  );
}
