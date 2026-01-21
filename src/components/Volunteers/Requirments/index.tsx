import { useGetVolunteers } from '@/services/volunteers';

const Requirments = () => {
  const { data } = useGetVolunteers();
  const desc = data && data.data[0].description;
  console.log(data,"data")
  return ( desc && (

    <section>
      <div className="main-container">
        <div className='pt-[40px]'>
          <div
            className="text-white mt-[40]"
            dangerouslySetInnerHTML={{ __html: desc || '' }}
          />
        </div>
        {/* <div className="text-white mt-[40px]">
          <h2 className=" text-[20px] lg:text-[24px] font-normal mb-[20px]">
            Könüllü olmaq üçün əsas tələblər:
          </h2>
          <ol className="list-decimal text-[11px] md:text-[12px] text-[#FFFFFFCC] list-inside">
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li>Orem Ipsum is simply dummy text of the printing.</li>
            <li>
              Rem Ipsum is simply dummy text of the printing and typesetting.
            </li>
            <li>Eem Ipsum is simply dummy text of the printing.</li>
            <li>Lorem Ipsum is simply dummy text of the printing.</li>
          </ol>
        </div> */}
        {/* <span className="bg-[#FFFFFF1F] my-[28px] block h-[1px] w-full"></span>
        <div className="text-white">
          <h2 className="text-[20px] lg:text-[24px] font-normal mb-[20px]">
            Könüllülərin cəlb prosesi:
          </h2>
          <ol className="list-decimal text-[11px] md:text-[12px] text-[#FFFFFFCC] list-inside">
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li>Orem Ipsum is simply dummy text of the printing.</li>
            <li>
              Rem Ipsum is simply dummy text of the printing and typesetting.
            </li>
            <li>Eem Ipsum is simply dummy text of the printing.</li>
            <li>Lorem Ipsum is simply dummy text of the printing.</li>
          </ol>
        </div> */}
      </div>
    </section>
  )

  );
};

export default Requirments;
