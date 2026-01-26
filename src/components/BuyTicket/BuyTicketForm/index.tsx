import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/UI/PrimaryButton";
import { translateds } from "@/context/TranslateContext";
import { AvailableProduct, Competition, FormConfig } from "@/services/competitions/types";
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

  // Form config helpers
  const formConfig = competitionDetail?.form_config || {};

  const isFieldEnabled = (fieldName: keyof FormConfig): boolean => {
    const config = formConfig[fieldName];
    return config?.enabled !== false; // Default to true if not specified
  };

  const getFieldLabel = (fieldName: keyof FormConfig, defaultLabel: string): string => {
    const config = formConfig[fieldName];
    return config?.label_az || config?.label || defaultLabel;
  };

  const getFieldPlaceholder = (fieldName: keyof FormConfig, defaultPlaceholder: string): string => {
    const config = formConfig[fieldName];
    return config?.placeholder_az || config?.placeholder || defaultPlaceholder;
  };

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
  const [showPromoCode, setShowPromoCode] = React.useState<boolean>(false);

  // Products state
  type SelectedProduct = {
    product_id: number;
    size?: string;
    color?: string;
    quantity: number;
    price: number;
    name: string;
  };
  const [selectedProducts, setSelectedProducts] = React.useState<SelectedProduct[]>([]);

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

    // Calculate products total
    const productsTotal = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total =
      Number(distancePrice) +
      Number(logisticsPrice) +
      Number(tentRentalPrice) +
      Number(donation) +
      Number(productsTotal);

    if (discountResponse?.discount_amount) {
      total -= discountResponse.discount_amount;
    }

    setTotalAmount(total);
  }, [
    form.watch("distance_id"),
    form.watch("logistics"),
    form.watch("tent_rental"),
    form.watch("donation_amount"),
    selectedProducts,
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
      // Prepare products for API
      const productsPayload = selectedProducts.map((p) => ({
        product_id: p.product_id,
        size: p.size || undefined,
        color: p.color || undefined,
        quantity: p.quantity,
      }));

      const payload = {
        ...data,
        distance_id: Number(data.distance_id),
        donation_amount: Number(data.donation_amount),
        promo_code: promoCode || undefined,
        products: productsPayload.length > 0 ? productsPayload : undefined,
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

  // Product management functions
  const addProduct = (product: AvailableProduct) => {
    const existing = selectedProducts.find((p) => p.product_id === product.id);
    if (existing) {
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.product_id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          product_id: product.id,
          name: product.name_az || product.name,
          price: product.price,
          quantity: 1,
          size: product.sizes?.[0],
          color: product.colors?.[0]?.name,
        },
      ]);
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.product_id !== productId)
    );
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.product_id === productId ? { ...p, quantity } : p
      )
    );
  };

  const updateProductSize = (productId: number, size: string) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.product_id === productId ? { ...p, size } : p
      )
    );
  };

  const updateProductColor = (productId: number, color: string) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.product_id === productId ? { ...p, color } : p
      )
    );
  };

  const isProductSelected = (productId: number) => {
    return selectedProducts.some((p) => p.product_id === productId);
  };

  const getSelectedProduct = (productId: number) => {
    return selectedProducts.find((p) => p.product_id === productId);
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
                {(isFieldEnabled("itra_code") || isFieldEnabled("team_name")) && (
                  <span className="text-[#FFFFFF80]  inline-block mb-[12px] text-[12px]">
                    *{translateds("itra_code_have")}
                  </span>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[20px] w-full">
                  {isFieldEnabled("itra_code") && (
                    <div>
                      <label
                        htmlFor="itra_code"
                        className="block text-white text-sm mb-2"
                      >
                        {getFieldLabel("itra_code", translateds("ITRA_code"))}
                      </label>
                      <input
                        {...form.register("itra_code")}
                        className="w-full  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B98A1] duration-300"
                        type="text"
                        placeholder={getFieldPlaceholder("itra_code", translateds("ITRA_code"))}
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
                  )}
                  {isFieldEnabled("team_name") && (
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
                  )}

                  {isFieldEnabled("country_id") && (
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
                      </select>
                      {form.formState.errors.country_id && (
                        <p className="text-red-400 text-xs mt-1">
                          {form.formState.errors.country_id.message}
                        </p>
                      )}
                    </div>
                  )}
                  {isFieldEnabled("email") && (
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
                  )}
                  {isFieldEnabled("phone") && (
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
                  )}
                </div>
              </div>
            </div>
            <div className="pt-[40px]">
              <div className="pb-[24px] !font-poppins text-base">
                <h3 className="!font-poppins">{translateds("race_info")}</h3>
              </div>
              <div>
                <label
                  htmlFor="distance_id"
                  className="block text-white text-sm mb-2"
                >
                  {translateds("mesafe")}
                </label>
                <div className="grid grid-cols-1 gap-[20px] w-full">
                  {competitionDetail?.distances.length !== 0 && (
                    <select
                      {...form.register("distance_id")}
                      className="w-full appearance-none custom-select  bg-[#FFFFFF14] py-[16px] pl-[18px] rounded-full text-white placeholder:text-gray-400 focus:outline-none pr-[16px] focus:ring-2 focus:ring-[#0B98A1] duration-300"
                    >
                      <option value="" disabled>
                        {translateds("mesafe")}
                      </option>

                      {[...(competitionDetail?.distances || [])]
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .map(
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
                  )}
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

            {/* Products Section */}
            {competitionDetail?.available_products &&
              competitionDetail.available_products.length > 0 && (
                <div className="pt-[40px]">
                  <div className="pb-[24px] text-base">
                    <h3 className="!font-poppins">{translateds("products") || "Məhsullar"}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                    {competitionDetail.available_products.map((product) => (
                      <div
                        key={product.id}
                        className={`bg-[#FFFFFF14] rounded-[12px] p-[16px] ${
                          isProductSelected(product.id)
                            ? "ring-2 ring-[#0B98A1]"
                            : ""
                        }`}
                      >
                        <div className="flex gap-[12px]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[80px] h-[80px] object-cover rounded-[8px]"
                          />
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">
                              {product.name_az || product.name}
                            </h4>
                            <p className="text-[#0B98A1] text-sm mt-1">
                              {product.price} AZN
                            </p>
                            {!product.in_stock && (
                              <p className="text-red-400 text-xs mt-1">
                                {translateds("out_of_stock") || "Stokda yoxdur"}
                              </p>
                            )}
                          </div>
                        </div>

                        {product.in_stock && (
                          <div className="mt-[12px]">
                            {!isProductSelected(product.id) ? (
                              <button
                                type="button"
                                onClick={() => addProduct(product)}
                                className="w-full py-[8px] bg-[#0B98A1] hover:bg-[#0a8890] text-white text-sm rounded-full transition-colors"
                              >
                                {translateds("add_to_cart") || "Səbətə əlavə et"}
                              </button>
                            ) : (
                              <div className="space-y-[10px]">
                                {/* Size selector */}
                                {product.sizes && product.sizes.length > 0 && (
                                  <div>
                                    <label className="text-[#FFFFFF80] text-xs block mb-1">
                                      {translateds("size") || "Ölçü"}
                                    </label>
                                    <select
                                      value={getSelectedProduct(product.id)?.size || ""}
                                      onChange={(e) =>
                                        updateProductSize(product.id, e.target.value)
                                      }
                                      className="w-full bg-[#FFFFFF14] py-[8px] px-[12px] rounded-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0B98A1]"
                                    >
                                      {product.sizes.map((size) => (
                                        <option key={size} value={size}>
                                          {size}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}

                                {/* Color selector */}
                                {product.colors && product.colors.length > 0 && (
                                  <div>
                                    <label className="text-[#FFFFFF80] text-xs block mb-1">
                                      {translateds("color") || "Rəng"}
                                    </label>
                                    <div className="flex gap-[8px] flex-wrap">
                                      {product.colors.map((color) => (
                                        <button
                                          key={color.name}
                                          type="button"
                                          onClick={() =>
                                            updateProductColor(product.id, color.name)
                                          }
                                          className={`w-[28px] h-[28px] rounded-full border-2 ${
                                            getSelectedProduct(product.id)?.color ===
                                            color.name
                                              ? "border-[#0B98A1]"
                                              : "border-transparent"
                                          }`}
                                          style={{ backgroundColor: color.code }}
                                          title={color.name}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Quantity controls */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-[12px]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateProductQuantity(
                                          product.id,
                                          (getSelectedProduct(product.id)?.quantity || 1) - 1
                                        )
                                      }
                                      className="w-[28px] h-[28px] bg-[#FFFFFF14] hover:bg-[#FFFFFF24] rounded-full text-white flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <span className="text-white text-sm min-w-[20px] text-center">
                                      {getSelectedProduct(product.id)?.quantity || 0}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateProductQuantity(
                                          product.id,
                                          (getSelectedProduct(product.id)?.quantity || 0) + 1
                                        )
                                      }
                                      className="w-[28px] h-[28px] bg-[#FFFFFF14] hover:bg-[#FFFFFF24] rounded-full text-white flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeProduct(product.id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                  >
                                    {translateds("remove") || "Sil"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Selected products summary */}
                  {selectedProducts.length > 0 && (
                    <div className="mt-[16px] p-[16px] bg-[#FFFFFF0A] rounded-[12px]">
                      <h4 className="text-white text-sm font-medium mb-[12px]">
                        {translateds("selected_products") || "Seçilmiş məhsullar"}
                      </h4>
                      <div className="space-y-[8px]">
                        {selectedProducts.map((item) => (
                          <div
                            key={item.product_id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-[#FFFFFF99]">
                              {item.name} x{item.quantity}
                              {item.size && ` (${item.size})`}
                              {item.color && ` - ${item.color}`}
                            </span>
                            <span className="text-white">
                              {(item.price * item.quantity).toFixed(2)} AZN
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* Promo Code Section */}
            <div>
              <div className="pt-[40px] text-base">
                <button
                  type="button"
                  onClick={() => setShowPromoCode(!showPromoCode)}
                  className="text-base !font-poppins text-[#53C5D7] hover:text-[#0B98A1] transition-colors cursor-pointer"
                >
                  {translateds("promocode_have")}
                </button>
              </div>
              {showPromoCode && (
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
              )}
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
