import BuyTicketForm from '@/components/BuyTicket/BuyTicketForm';
import { CompetitionBanner } from '@/components/Competitions';
import { Competition } from '@/services/competitions/types';
import { SEO } from '@/components/SEO';
import { useLocation } from 'react-router';

const BuyTicket = () => {
  const location = useLocation();

  const { competitionDetail } = location.state as {
    competitionDetail: Competition;
  };

  return (
    <>
      <SEO seoKey="buy-ticket" />
      {/* <BreadCrumbTitle className=" absolute top-0" breadcrumbs={breadcrumbs} /> */}
      <div className='pt-[118px]'>
        <CompetitionBanner
          showSearch={false}
          title={competitionDetail.name}
          image={
            'https://s3-alpha-sig.figma.com/img/2e30/edf0/f0a6eb1cfe64e146892fab4ff2ae59a3?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TAEcRwaah4FiGIEk8JySIpUpRtWWllgOqLSBvM097Iuzs3TyvKUSLAwDzR6CJ0CzyztPE8AGSxkl3rr0jU1S1y~hKEwl4cg5kpdv4cFQHXdKXNji52zqkIMEUAAV7nxKtGrsLWMieUFVYHXPCTll75kZxoRlb7yXpX1YQolpjuEX~57BsrxpSf1ekM~RIJ4haXBEI1RuvOEQlZtfsVDKMUcwd5l-wy9C6uIz~bGQXaTjju6PMy9bJkUdPZtyHp9RGBnjHZ8zNjCN6HbID7UDDMMqWLIeqsX41j0vExw3OZP7pkuVfTfsHuKq8pUtOKrIsyjRV-j0HucfB1xtcKZ4yQ__'
          }
        />
        <BuyTicketForm competitionDetail={competitionDetail} />
      </div>
    </>
  );
};

export default BuyTicket;
