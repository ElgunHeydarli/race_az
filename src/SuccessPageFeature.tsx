// SuccessPageFeature.tsx
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate, useSearchParams } from 'react-router';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { translateds } from '@/context/TranslateContext';
import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

export default function SuccessPageFeature() {
  const { lang } = useChangeLang();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('ID');
  const redirectStatus = searchParams.get('STATUS')?.toLowerCase();
  const [load, setLoad] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [data, setData] = useState<{ image: string; button_text: string }>({
    button_text: '',
    image: '',
  });

  useEffect(() => {
    if (!orderId) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `https://admin.race.az/api/payment-link/${orderId}/get-status`,
          { headers: { 'Accept-Language': lang } },
        );

        const status =
          res.data['payment-status']?.toLowerCase() ||
          redirectStatus ||
          'pending';
        setOrderStatus(status);

        if (status === 'rejected' || status === 'cancelled') {
          navigate('/feature-error', { replace: true });
        }
      } catch (err) {
        console.error('Error fetching order status:', err);
        navigate('/feature-error', { replace: true });
      }
    };

    fetchStatus();
  }, [orderId, redirectStatus, lang, navigate]);

  useEffect(() => {
    if (!orderStatus || orderStatus !== 'approved') return;

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [orderStatus]);

  // 3️⃣ Success page datasını çek
  useEffect(() => {
    const fetchSuccessPage = async () => {
      setLoad(true);
      try {
        const res = await axios.get('https://admin.race.az/api/success-page', {
          headers: { 'Accept-Language': lang },
        });
        if (res.data) setData(res.data.data);
      } catch (error) {
        console.error('Error fetching success page:', error);
      } finally {
        setLoad(false);
      }
    };
    fetchSuccessPage();
  }, [lang]);

  return (
    <section className="py-[100px]">
      <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
        {load ? null : (
          <div className="max-w-md w-full mx-auto text-center space-y-6">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <img src={data?.image || ''} className="object-contain" />
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white">
                {orderStatus === 'approved'
                  ? translateds('success_order')
                  : orderStatus === 'pending'
                  ? translateds('order_pending')
                  : translateds('order_cancelled')}
              </h1>
              <p className="text-gray-400">
                {orderStatus === 'approved'
                  ? translateds('track_product')
                  : orderStatus === 'pending'
                  ? translateds('waiting_payment')
                  : translateds('try_again')}
              </p>
              <PrimaryButton
                className="gap-2 flex items-center justify-center"
                onClick={() => navigate('/')}
              >
                {data?.button_text || 'Əsas səhifəyə qayıt'}
                <ArrowLeft className="w-4 h-4" />
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
