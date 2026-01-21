import { Route, Routes } from 'react-router';
import { Root } from './layout';
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import ErrorPage from './pages/OrderSuccess/ErrorPage';
import ProductOrderSuccess from './pages/ProductOrderSucess';
import DynamicRoute from './DynamicRoute';
import SuccessPageFeature from './SuccessPageFeature';
import ErrorFeature from './ErrorFeature';
//! Lazy load all pages
const ResultDetail = lazy(
  () => import('./pages/ResultDetail'),
);
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Partners = lazy(() => import('./pages/Partners'));
const Volunteers = lazy(() => import('./pages/Volunteers'));
const Competitions = lazy(
  () => import('./pages/Competitions'),
);
const CompetitionDetail = lazy(
  () => import('./pages/CompetitionDetail'),
);
const Results = lazy(() => import('./pages/Results'));
const Gallery = lazy(() => import('./pages/Gallery'));
const GalleryDetail = lazy(
  () => import('./pages/GalleryDetail'),
);
const PartnerCompetitions = lazy(
  () => import('./pages/PartnerCompetitions'),
);
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(
  () => import('./pages/ProductDetail'),
);
const Calendar = lazy(() => import('./pages/Calendar'));
const Basket = lazy(() => import('./pages/Basket'));
const BuyTicket = lazy(() => import('./pages/BuyTicket'));
const Order = lazy(() => import('./pages/Order'));
const OrderSuccess = lazy(
  () => import('./pages/OrderSuccess'),
);

function App() {
  const FallbackLoader = () => (
    <div className="flex justify-center items-center h-[100vh]">
      <Loader2 color="#fff" className="animate-spin" />
    </div>
  );

  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route
            path="/volunteers"
            element={<Volunteers />}
          />
          <Route
            path="/competitions"
            element={<Competitions />}
          />
          <Route
            path="/competition/:slug"
            element={<CompetitionDetail />}
          />
          <Route path="/results" element={<Results />} />
          <Route
            path="/result/:slug"
            element={<ResultDetail />}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/gallery/:slug"
            element={<GalleryDetail />}
          />
          <Route
            path="/partner-competitions"
            element={<PartnerCompetitions />}
          />

          <Route path="/products" element={<Products />} />
          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/buy-ticket"
            element={<BuyTicket />}
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/order" element={<Order />} />
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />
          {/* success page features */}
          <Route
            path="/payment-link-success"
            element={<SuccessPageFeature />}
          />
          <Route
            path="/feature-error"
            element={<ErrorFeature />}
          />

          <Route
            path="/product-success"
            element={<ProductOrderSuccess />}
          />
          <Route
            path="/product-fail"
            element={<ErrorPage />}
          />
          <Route
            path="/order-error"
            element={<ErrorPage />}
          />
          {/* https://race.az/payment-link/test-payment */}
          <Route
            path="/payment-link/:dynamicId"
            element={<DynamicRoute />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
