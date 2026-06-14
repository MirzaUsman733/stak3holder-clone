import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { MarketProvider } from "./context/MarketContext";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export default function App() {
  return (
    <ThemeProvider>
      <MarketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/portfolio"
              element={
                <PlaceholderPage
                  title="Portfolio"
                  description="Connect your wallet to view holdings, balances, and performance."
                />
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PlaceholderPage
                  title="Leaderboard"
                  description="Weekly and all-time top trades will appear here after wallet integration."
                />
              }
            />
            <Route
              path="/blog"
              element={
                <PlaceholderPage
                  title="Blog"
                  description="Stakeholder news, market insights, and product updates."
                />
              }
            />
            <Route
              path="/faq"
              element={
                <PlaceholderPage
                  title="FAQ"
                  description="Answers about trading, AP poll rewards, payouts, and platform mechanics."
                />
              }
            />
            <Route
              path="/terms"
              element={
                <PlaceholderPage
                  title="Terms"
                  description="Terms of service content can be connected to your CMS or legal pages."
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PlaceholderPage
                  title="Privacy"
                  description="Privacy policy content can be connected to your CMS or legal pages."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MarketProvider>
    </ThemeProvider>
  );
}
