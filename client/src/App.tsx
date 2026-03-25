import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Sectors from "./pages/Sectors";
import About from "./pages/About";
import HowWeWork from "./pages/HowWeWork";
import CaseStudies from "./pages/CaseStudies";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Emergency from "./pages/Emergency";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { Blog } from "./pages/Blog";
import { BlogArticle } from "./pages/BlogArticle";
import { AdminBlog } from "./pages/AdminBlog";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/sectors" component={Sectors} />
          <Route path="/about" component={About} />
          <Route path="/how-we-work" component={HowWeWork} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/resources" component={Resources} />
          <Route path="/contact" component={Contact} />
          <Route path="/emergency" component={Emergency} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogArticle} />
          <Route path="/admin/blog" component={AdminBlog} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
