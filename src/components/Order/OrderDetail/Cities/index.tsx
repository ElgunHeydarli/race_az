

const Cities = () => {

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[20px]">
        {/* <div className="relative">
          <select
            disabled={!deliverToAdress}
            className={`w-full appearance-none custom-select bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300 ${
              !deliverToAdress ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            <option value="" disabled selected>
              {translateds('select_city')}
            </option>
            {cities?.data.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {!deliverToAdress && (
            <div className="absolute inset-0 bg-black/10 rounded-full pointer-events-none" />
          )}
        </div>
        <div className="relative">
          <input
            disabled={!deliverToAdress}
            className={`w-full bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300 ${
              !deliverToAdress ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="text"
            placeholder={translateds('Address_t')}
          />
          {!deliverToAdress && (
            <div className="absolute inset-0 bg-black/10 rounded-full pointer-events-none" />
          )}
        </div> */}
      </div>
    </>
  );
};

export default Cities;
