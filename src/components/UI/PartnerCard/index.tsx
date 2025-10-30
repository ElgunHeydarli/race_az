const PartnerCard = ({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) => {
  return (
    <>
      <div className="flex cursor-pointer justify-center md:max-w-[158px] md:h-[106px]  items-center">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-[106px]  rounded-[12px]  object-cover"
        />
      </div>
    </>
  );
};

export default PartnerCard;
