import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="site-container py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-4 text-muted-foreground">{description}</p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Markets
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
