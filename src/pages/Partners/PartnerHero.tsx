import { useChangeLang } from "@/hooks/useChangeLang";
import axios from "axios";
import React from "react";

const PartnerHero = () => {
    const { lang } = useChangeLang();

    const [data, setData] = React.useState<any>();
    const getHero = async () => {
        try {
            const res = await axios.get("https://admin.race.az/api/partner-heroes", {
                headers: {
                    "Accept-Language": lang,
                }
            });
            if (res.data && res.data?.data) {
                setData(res.data?.data[0]);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getHero();
    }, [lang]);

    return (
        <section>
            <div className="main-container">
                <div className="bg-[#FFFFFF0A] relative py-5 sm:py-6 md:py-8 lg:py-[60px] px-5 sm:px-8 md:px-12 lg:px-16 text-white rounded-[12px] overflow-hidden">
                    <div className="flex flex-col lg:flex-row relative">
                        {/* Side label - responsive positioning */}
                        <div className="flex items-center lg:absolute lg:left-[-9rem] lg:top-1/2 lg:-translate-y-1/2 lg:-rotate-90 lg:origin-center mb-6 lg:mb-0">
                            <span className="w-8 sm:w-12 lg:w-20 h-[1px] bg-[#FFFFFF66]"></span>
                            <p className="text-[#FFFFFF66] font-extralight whitespace-nowrap mx-3 text-sm sm:text-base">
                                {data?.title ?? ""}
                            </p>
                            <span className="w-8 sm:w-12 lg:w-20 h-[1px] bg-[#FFFFFF66]"></span>
                        </div>

                        {/* Content area - adapts to available space */}
                        <div className="w-full lg:pl-24">
                            <h2 className="mb-4 sm:mb-5 lg:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
                                {data?.title}
                            </h2>
                            <div
                                className="text-xs sm:text-sm lg:text-base opacity-90"
                                dangerouslySetInnerHTML={{
                                    __html: data?.description || '',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerHero;
