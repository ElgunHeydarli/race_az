import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate, useSearchParams } from 'react-router';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { translateds } from '@/context/TranslateContext';
import { axiosClient } from '@/api/axiosClient';
import axios from 'axios';
import { useChangeLang } from '@/hooks/useChangeLang';

export default function OrderSuccess() {
  const { lang } = useChangeLang();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('ID');
  const orderStatusParam = searchParams.get('STATUS')?.toLowerCase() || null;
  const [, setOrderStatus] = useState<string | null>(null);
  const [data, setData] = useState<{ image: string; button_text: string }>({ button_text: '', image: '' });
  const [load, setLoad] = useState<boolean>(false);

  // 1️⃣ Sayfa açıldığında status'e göre hemen yönlendir
  useEffect(() => {
    if (!orderStatusParam) return;

    if (orderStatusParam === 'declined' || orderStatusParam === 'cancelled') {
      navigate('/order-error', { replace: true });
    }
  }, [orderStatusParam, navigate]);

  // 2️⃣ Status başarılıysa confetti çalıştır
  useEffect(() => {
    if (!orderStatusParam || orderStatusParam === 'declined' || orderStatusParam === 'cancelled') return;

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
  }, [orderStatusParam]);

  // 3️⃣ API'den siparişin gerçek durumunu çek
  useEffect(() => {
    if (!orderId) return;
    const fetchStatus = async () => {
      try {
        const response = await axiosClient.get<{ status: string }>(
          `/competitions/${orderId}/get-status`
        );
        setOrderStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };
    fetchStatus();
  }, [orderId]);

  // 4️⃣ Success sayfa datasını çek
  useEffect(() => {
    const fetchSuccessPage = async () => {
      setLoad(true);
      try {
        const res = await axios.get('https://admin.race.az/api/success-page', {
          headers: { 'Accept-Language': lang },
        });
        if (res.data) {
          setData(res.data?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchSuccessPage();
  }, [lang]);

  return (
    <section className="py-[100px]">
      <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
        {load ? (
          <></>
        ) : (
          <div className="max-w-md w-full mx-auto text-center space-y-6">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <img src={data?.image || ''} className="object-contain" />
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white">
                {translateds('success_order')}
              </h1>
              <p className="text-gray-400">{translateds('track_product')}</p>
              <PrimaryButton
                className="gap-2 flex items-center justify-center"
                onClick={() => navigate('/')}>
                {data?.button_text || ''}
                <ArrowLeft className="w-4 h-4" />
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
