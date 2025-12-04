import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/UI/PrimaryButton";
import { translateds } from "@/context/TranslateContext";
import { Competition } from "@/services/competitions/types";
import { CountriesForDeliveryForm } from "@/components/Order/OrderDetail/Delivery";
import { useFetch } from "@/utils/reactQuery";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { axiosClient } from "@/api/axiosClient";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import BaseCalendar from "../BaseCalendar";
import { formSchema, FormValues } from "./form-schema";
import axios from "axios";
const BuyTicketForm = ({
  competitionDetail,
}: {
  competitionDetail: Competition;
}) => {
  const promo_applied = translateds("promo_applied");

  const [promoCode, setPromoCode] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discountResponse, setDiscountResponse] = useState<{
    discount_amount: number;
    promo_code: string;
    discount_text?: string;
    discounted_amount?: string;
    discount_type?: string;
    distance_name?: string;
    message?: string;
    valid: boolean;
  } | null>(null);

  const [raceNumber, setRaceNumber] = React.useState<string>("");
  const [resultat, setResultat] = React.useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      birth_date: undefined,
      gender: "",
      itra_code: "",
      team_name: "",
      country_id: "",
      email: "",
      phone: "",
      logistics: "no",
      tent_rental: "no",
      donation_amount: 0,
      race_number: raceNumber || "",
      promo_code: "",
      terms_accepted: false,
    },
  });

  useEffect(() => {
    if (competitionDetail?.distances?.[0]?.price) {
      const defaultDistanceId = competitionDetail.distances[0].id.toString();

      form.reset({
        ...form.getValues(),
        distance_id: defaultDistanceId,
      });
    }
  }, [competitionDetail]);

  useEffect(() => {
    const values = form.getValues();

    const selectedDistance = competitionDetail?.distances.find(
      (d) => d.id.toString() === values.distance_id
    );
    const distancePrice = selectedDistance?.price || 0;

    const logisticsPrice =
      values.logistics === "yes" &&
      competitionDetail?.logistics_services?.logistics.available
        ? competitionDetail.logistics_services.logistics.price
        : 0;

    const tentRentalPrice =
      values.tent_rental === "yes" &&
      competitionDetail?.logistics_services?.tent_rental.available
        ? competitionDetail.logistics_services.tent_rental.price
        : 0;

    const donation = Number(values.donation_amount || 0);

    let total =
      Number(distancePrice) +
      Number(logisticsPrice) +
      Number(tentRentalPrice) +
      Number(donation);

    if (discountResponse?.discount_amount) {
      total -= discountResponse.discount_amount;
    }

    setTotalAmount(total);
  }, [
    form.watch("distance_id"),
    form.watch("logistics"),
    form.watch("tent_rental"),
    form.watch("donation_amount"),
    discountResponse,
    competitionDetail,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        distance_id: Number(data.distance_id),
        donation_amount: Number(data.donation_amount),
        promo_code: promoCode || undefined,
      };

      const response = await axiosClient.post<{
        redirect_url: string;
        success: boolean;
      }>(`/competitions/${competitionDetail.id}/register`, payload);

      toast.success(translateds("sifaris_yaradildi"));
      if (response.data.success && response.data.redirect_url) {
        const redirectUrl = response.data.redirect_url;

        window.location.href = redirectUrl;
      } else {
        toast.error(translateds("sifaris_err"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message ?? "");
        }
      }
      console.error(error);
    }
  };

  const handleChangePromoCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\p{L}\p{N}\s.-]*$/u;
    const filteredValue = e.target.value
      .split("")
      .filter((char) => regex.test(char))
      .join("");
    setPromoCode(filteredValue);
  };

  const handleSubmitPromoCode = async () => {
    const distanceId = form.getValues("distance_id");

    if (!promoCode.trim()) {
      return;
    }

    try {
      const payload = {
        promo_code: promoCode,
        distance_id: distanceId,
      };

      const response = await axiosClient.post(
        `/competitions/${competitionDetail.slug}/check-promo`,
        payload
      );

      if (response.data) {
        setDiscountResponse(response.data);
      }
      toast.success(promo_applied);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message ?? "");
        }
      }
    }
  };

  const { data: countriesForDelivery } = useFetch<{
    data: CountriesForDeliveryForm[];
  }>("countries");
  const hasCountries =
    countriesForDelivery &&
    countriesForDelivery?.data &&
    countriesForDelivery?.data?.length > 0
      ? countriesForDelivery?.data
      : [];

  return (
    <>
      <section className="pb-[100px] ">
        <div className="main-container">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mx-auto block rounded-[20px] bg-[#FFFFFF0A]/50 bg-gradient-to-b from-[#FFFFFF0A] to-transparent px-[16px]  md:px-[35px] lg:px-[60px] py-[40px] lg:py-[60px] text-white max-w-3xl"
          >
            <h1 className="md:text-xl text-lg lg:text-2xl font-semibold text-center">
              {translateds("order_information")}
            </h1>
            <div className="pt-[40px]">
              <div className="pb-[24px]  transition-colors text-base">
                <h3 className="!font-poppins">{translateds("user_info")}</h3>
              </div>
              <div>
                <span className="text-[#FFFFFF80]  inline-block mb-[12px] text-[12px]">
                  *{translateds("english_name")}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[20px] w-full">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("name")}
                    </label>
                    <input
                      onChange={(e) => {
                        const regex = /^[a-zA-Z\s-]*$/;
                        const filteredValue = e.target.value
                          .split("")
                          .filter((char) => regex.test(char))
                          .join("");
                        form.setValue("name", filteredValue);
                      }}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          "Backspace",
                          "Tab",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Home",
                          "End",
                        ];
                        const key = e.key;
                        const regex = /^[a-zA-Z\s-]$/;

                        if (allowedKeys.includes(key)) return;

                        if (!regex.test(key)) {
                          e.preventDefault();
                        }
                      }}
                      className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      placeholder={translateds("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("surname")}
                    </label>
                    <input
                      {...form.register("surname")}
                      onChange={(e) => {
                        const regex = /^[a-zA-Z\s-]*$/;
                        const filteredValue = e.target.value
                          .split("")
                          .filter((char) => regex.test(char))
                          .join("");
                        form.setValue("surname", filteredValue);
                      }}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          "Backspace",
                          "Tab",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Home",
                          "End",
                        ];
                        const key = e.key;
                        const regex = /^[a-zA-Z\s-]$/;

                        if (allowedKeys.includes(key)) return;

                        if (!regex.test(key)) {
                          e.preventDefault();
                        }
                      }}
                      className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      placeholder={translateds("surname")}
                    />
                    {form.formState.errors.surname && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.surname.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="birth_date"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("Date_of_birth")}
                    </label>
                    <Controller
                      control={form.control}
                      name="birth_date"
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            value={
                              field.value
                                ? format(field.value, "yyyy-MM-dd")
                                : ""
                            }
                            readOnly
                            placeholder={translateds("Date_of_birth")}
                            onClick={() => setShowCalendar(true)}
                            className="w-full bg-[#FFFFFF14] py-[16px] pl-[18px] pr-[40px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300 cursor-pointer"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                            <Calendar size={20} />
                          </span>
                          {showCalendar && (
                            <div
                              ref={calendarRef}
                              className="absolute z-50 mt-2 bg-[#1E1E1E] border border-[#333] rounded-lg shadow-xl p-2"
                            >
                              <BaseCalendar
                                setShowCalendar={setShowCalendar}
                                field={field}
                              />
                            </div>
                          )}
                        </>
                      )}
                    />
                    {form.formState.errors.birth_date && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.birth_date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("gender")}
                    </label>
                    <select
                      {...form.register("gender")}
                      className="w-full appearance-none custom-select  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300"
                    >
                      <option value="">{translateds("gender")}</option>
                      <option value="male">{translateds("Male")}</option>
                      <option value="female">{translateds("female")}</option>
                    </select>
                    {form.formState.errors.gender && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-[20px]">
                <span className="text-[#FFFFFF80]  inline-block mb-[12px] text-[12px]">
                  *{translateds("itra_code_have")}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[20px] w-full">
                  <div>
                    <label
                      htmlFor="itra_code"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("ITRA_code")}
                    </label>
                    <input
                      {...form.register("itra_code")}
                      className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      placeholder={translateds("ITRA_code")}
                      onChange={(e) => {
                        const regex = /^[\p{L}\p{N}\s.-]*$/u;
                        const filteredValue = e.target.value
                          .split("")
                          .filter((char) => regex.test(char))
                          .join("");
                        form.setValue("itra_code", filteredValue);
                      }}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          "Backspace",
                          "Tab",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Home",
                          "End",
                        ];
                        const key = e.key;
                        const regex = /^[\p{L}\p{N}\s.-]*$/u;

                        if (allowedKeys.includes(key)) return;

                        if (!regex.test(key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {form.formState.errors.itra_code && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.itra_code.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="team_name"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("your_club")}
                    </label>
                    <input
                      {...form.register("team_name")}
                      className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      placeholder={translateds("team_name")}
                      onChange={(e) => {
                        const regex = /^[\p{L}\p{N}\s.-]*$/u;
                        const filteredValue = e.target.value
                          .split("")
                          .filter((char) => regex.test(char))
                          .join("");
                        form.setValue("team_name", filteredValue);
                      }}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          "Backspace",
                          "Tab",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Home",
                          "End",
                        ];
                        const key = e.key;
                        const regex = /^[\p{L}\p{N}\s.-]*$/u;

                        if (allowedKeys.includes(key)) return;

                        if (!regex.test(key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {form.formState.errors.team_name && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.team_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("select_a_country")}
                    </label>
                    <select
                      {...form.register("country_id")}
                      className={`w-full appearance-none custom-select bg-[#FFFFFF14] py-[14px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300`}
                    >
                      <option value="" disabled selected>
                        {translateds("select_a_country")}
                      </option>
                      {hasCountries?.map((c: CountriesForDeliveryForm) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                      {form.formState.errors.country_id && (
                        <p className="text-red-400 text-xs mt-1">
                          {form.formState.errors.country_id.message}
                        </p>
                      )}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white text-sm mb-2"
                    >
                      Email
                    </label>
                    <input
                      {...form.register("email")}
                      className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="text"
                      placeholder="Email"
                      onChange={(e) => {
                        form.setValue("email", e.target.value);
                      }}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white text-sm mb-2"
                    >
                      {translateds("phone") || "Phone"}
                    </label>
                    <div className="flex bg-[#FFFFFF14] px-4 py-[18px] rounded-full">
                      <div>
                        <input
                          type="tel"
                          {...form.register("phone")}
                          placeholder="+ 994 00 00 00"
                          className="w-full  px-4 text-white placeholder:text-gray-400 focus:outline-none"
                          onChange={(e) => {
                            const regex = /^[\p{L}\p{N}\s.-]*$/u;
                            const filteredValue = e.target.value
                              .split("")
                              .filter((char) => regex.test(char))
                              .join("");
                            form.setValue("phone", filteredValue);
                          }}
                          onKeyDown={(e) => {
                            const allowedKeys = [
                              "Backspace",
                              "Tab",
                              "Enter",
                              "ArrowLeft",
                              "ArrowRight",
                              "Delete",
                              "Home",
                              "End",
                            ];
                            const key = e.key;
                            const regex = /^[\p{L}\p{N}\s.-]*$/u;

                            if (allowedKeys.includes(key)) return;

                            if (!regex.test(key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    {form.formState.errors.phone && (
                      <p className="text-red-400 text-xs ml-4 mt-1">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[40px]">
              <div className="pb-[24px] !font-poppins text-base">
                <h3 className="!font-poppins">{translateds("user_info")}</h3>
              </div>
              <div>
                <label
                  htmlFor="distance_id"
                  className="block text-white text-sm mb-2"
                >
                  {translateds("mesafe")}
                </label>
                <div className="grid grid-cols-1 gap-[20px] w-full">
                  <select
                    {...form.register("distance_id")}
                    className="w-full appearance-none custom-select  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300"
                  >
                    <option value="" disabled>
                      {translateds("mesafe")}
                    </option>
                    {competitionDetail?.distances.map(
                      (item) =>
                        item.status === "active" && (
                          <option key={item.id} value={item.id.toString()}>
                            {item.distance}
                          </option>
                        )
                    )}
                    {form.formState.errors.distance_id && (
                      <p className="text-red-400 text-xs mt-1">
                        {form.formState.errors.distance_id.message}
                      </p>
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-[20px]">
                <div className="grid grid-cols-1 gap-[20px] w-full">
                  {/* logistik */}
                  {competitionDetail?.logistics_services?.logistics
                    ?.available === true ? (
                    <div>
                      <label
                        htmlFor="logistics"
                        className="block text-white text-sm mb-2"
                      >
                        {translateds("logistik_text")}
                      </label>
                      <select
                        {...form.register("logistics")}
                        disabled={
                          !competitionDetail.logistics_services.logistics
                            .available
                        }
                        className="w-full appearance-none custom-select  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      >
                        <option value="">{translateds("logistik_text")}</option>
                        <option value="yes">{translateds("lazimdir")}</option>
                        <option value="no">{translateds("lazim_deyil")}</option>
                      </select>
                    </div>
                  ) : null}
                  {/* cadir kirayesi */}
                  {competitionDetail?.logistics_services?.tent_rental
                    ?.available === true ? (
                    <div>
                      <label
                        htmlFor="donation_amount"
                        className="block text-white text-sm mb-2"
                      >
                        {translateds("cadir_kirayesi")}
                      </label>
                      <select
                        {...form.register("tent_rental")}
                        disabled={
                          !competitionDetail.logistics_services.tent_rental
                            .available
                        }
                        className="w-full appearance-none custom-select  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      >
                        <option value="">
                          {translateds("cadir_kirayesi")}
                        </option>
                        <option value="yes">{translateds("lazimdir")}</option>
                        <option value="no">{translateds("lazim_deyil")}</option>
                      </select>
                    </div>
                  ) : null}

                  {competitionDetail?.logistics_services?.donation
                    ?.available === true ? (
                    <div>
                      <label
                        htmlFor="donation_amount"
                        className="block text-white text-sm mb-2"
                      >
                        {competitionDetail?.logistics_services?.donation
                          ?.title || ""}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder={
                          competitionDetail?.logistics_services?.donation
                            ?.title || ""
                        }
                        className="w-full appearance-none bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                        {...form.register("donation_amount", {
                          validate: (value) =>
                            /^\d+$/.test(String(value)) ||
                            translateds("only_number"),
                          setValueAs: (v) => (v === "" ? undefined : Number(v)),
                        })}
                        onKeyDown={(e) => {
                          const allowedKeys = [
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                            "Home",
                            "End",
                          ];
                          const isNumber = /^[0-9]$/.test(e.key);
                          if (!isNumber && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          const paste = e.clipboardData.getData("text");
                          if (!/^\d+$/.test(paste)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <p
                        className={
                          "pt-[12px] pl-2 text-[12px] text-[#FFFFFF80]"
                        }
                      ></p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* YARIS NOMRESI */}
            {typeof competitionDetail?.logistics_services?.number?.available ===
              "boolean" &&
            competitionDetail?.logistics_services?.number?.available ===
              true ? (
              <div>
                <div className="pt-[40px] text-base">
                  <h3 className="text-base !font-poppins">
                    {translateds("Race_number")}
                  </h3>
                </div>
                <p className={"pt-[12px] pl-2 text-[12px] text-[#FFFFFF80]"}>
                  *{translateds("custom_number_w")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mt-[20px]">
                  <div className="col-span-2">
                    <input
                      className="w-full  appearance-none bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                      type="number"
                      placeholder={translateds("Race_number")}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setRaceNumber(e.target.value);
                        form.setValue("race_number", e.target.value);
                      }}
                      value={raceNumber}
                      readOnly={!!resultat}
                    />
                    {/* <p
                    className={'pt-[12px] pl-2 text-[12px] text-[#FFFFFF80]'}>
                    *{translateds('custom_number_w')}
                  </p> */}
                  </div>
                  <PrimaryButton
                    type="button"
                    className="col-span-1"
                    onClick={async () => {
                      try {
                        const res = await axios.post(
                          "https://admin.race.az/api/competitions/gobustan-trail/buy-number",
                          { number: raceNumber }
                        );
                        if (res.data) {
                          toast.success(res.data?.message || "");
                          setResultat(res.data?.data?.price || "");
                        } else {
                          setResultat("");
                          console.log(res.status);
                        }
                      } catch (error) {
                        console.log(error);
                        setResultat("");
                      }
                    }}
                  >
                    {translateds("Apply")}
                  </PrimaryButton>
                </div>
              </div>
            ) : null}

            <div>
              <div className="pt-[40px]  text-base">
                <h3 className="text-base !font-poppins">
                  {translateds("promocode_have")}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mt-[20px]">
                <div className="col-span-2">
                  <input
                    onChange={handleChangePromoCode}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "Tab",
                        "Enter",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Home",
                        "End",
                      ];
                      const key = e.key;
                      const regex = /^[\p{L}\p{N}\s.-]*$/u;

                      if (allowedKeys.includes(key)) return;

                      if (!regex.test(key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full appearance-none bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                    type="text"
                    placeholder={translateds("promocode_pl")}
                  />
                </div>
                <PrimaryButton
                  type="button"
                  className="col-span-1"
                  onClick={handleSubmitPromoCode}
                >
                  {translateds("Apply")}
                </PrimaryButton>
              </div>
            </div>
            <div className="flex justify-between mt-[43px]">
              <span className="text-[#FFFFFF99]">{translateds("Total")}:</span>
              {resultat ? (
                <span>
                  {(parseFloat(resultat) + totalAmount).toFixed(2)} AZN
                </span>
              ) : (
                <span>{totalAmount.toFixed(2)} AZN</span>
              )}
            </div>
            <div className="mt-[40px] flex flex-col gap-[24px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    {...form.register("terms_accepted")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <label className="text-sm">
                    <span className="text-[#53C5D7] mr-1">
                      {translateds("race_condition_agree")}
                    </span>
                    {/* ilə razıyam */}
                  </label>
                </div>
                {form.formState.errors.terms_accepted && (
                  <p className="text-red-400 text-xs ml-4 mt-1">
                    {form.formState.errors.terms_accepted.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full duration-300 cursor-pointer bg-[#0B98A1] py-3 font-medium text-white hover:bg-teal-700"
              >
                {translateds("Order")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BuyTicketForm;
