"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";

type StepId = 1 | 2 | 3 | 4 | 5;

export default function NewOrderPage() {
  const { language } = useLanguage();

  const [currentStep, setCurrentStep] = useState<StepId>(1);

  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    engine: "",
    power: "",
    transmission: "",
  });

  const [ecu, setEcu] = useState({
    type: "ECU",
    manufacturer: "",
    model: "",
    software: "",
    hardware: "",
  });

  const [fileName, setFileName] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = useMemo(
    () => [
      {
        id: "stage1",
        name: language === "RO" ? "Stage 1" : "Stage 1",
        description:
          language === "RO"
            ? "Optimizare software pentru performanță și răspuns îmbunătățit."
            : "Software optimization for improved performance and response.",
        price: 89,
      },
      {
        id: "diagnostics",
        name: language === "RO" ? "Analiză diagnostică" : "Diagnostics review",
        description:
          language === "RO"
            ? "Verificare profesională a fișierului și a informațiilor ECU."
            : "Professional review of the ECU file and provided information.",
        price: 25,
      },
      {
        id: "custom",
        name: language === "RO" ? "Calibrare personalizată" : "Custom calibration",
        description:
          language === "RO"
            ? "Solicitare personalizată analizată înainte de procesare."
            : "Custom request reviewed before processing.",
        price: 120,
      },
    ],
    [language],
  );

  const total = services
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  const steps = [
    {
      id: 1 as StepId,
      title: language === "RO" ? "Vehicul" : "Vehicle",
      description:
        language === "RO"
          ? "Datele mașinii"
          : "Vehicle information",
    },
    {
      id: 2 as StepId,
      title: language === "RO" ? "ECU / TCU" : "ECU / TCU",
      description:
        language === "RO"
          ? "Informații controler"
          : "Controller information",
    },
    {
      id: 3 as StepId,
      title: language === "RO" ? "Fișier" : "File",
      description:
        language === "RO"
          ? "Încarcă originalul"
          : "Upload original file",
    },
    {
      id: 4 as StepId,
      title: language === "RO" ? "Servicii" : "Services",
      description:
        language === "RO"
          ? "Selectează serviciile"
          : "Select services",
    },
    {
      id: 5 as StepId,
      title: language === "RO" ? "Verificare" : "Review",
      description:
        language === "RO"
          ? "Confirmă comanda"
          : "Confirm your order",
    },
  ];

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((item) => item !== serviceId)
        : [...current, serviceId],
    );
  }

  function nextStep() {
    setCurrentStep((current) =>
      current < 5 ? ((current + 1) as StepId) : current,
    );
  }

  function previousStep() {
    setCurrentStep((current) =>
      current > 1 ? ((current - 1) as StepId) : current,
    );
  }

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard"
              className="text-xl font-semibold tracking-tight"
            >
              Performance
              <span className="text-blue-500">Tuning</span>
            </Link>

            <p className="mt-1 text-xs text-zinc-600">
              {language === "RO"
                ? "Comandă nouă"
                : "New tuning order"}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            ← {language === "RO" ? "Dashboard" : "Dashboard"}
          </Link>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {language === "RO"
                ? "Comandă nouă"
                : "New order"}
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {language === "RO"
                ? "Trimite un fișier ECU pentru procesare."
                : "Submit an ECU file for processing."}
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
              {language === "RO"
                ? "Completează pașii de mai jos. Poți verifica toate informațiile înainte de checkout."
                : "Complete the steps below. You can review all information before checkout."}
            </p>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-[760px] items-center gap-3">
              {steps.map((step, index) => {
                const active = step.id === currentStep;
                const completed = step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex flex-1 items-center gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                        active
                          ? "border-blue-500/30 bg-blue-500/[0.08]"
                          : completed
                            ? "border-green-500/20 bg-green-500/[0.04]"
                            : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                          active
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            : completed
                              ? "border-green-500/30 bg-green-500/10 text-green-400"
                              : "border-white/10 bg-white/[0.03] text-zinc-600"
                        }`}
                      >
                        {completed ? "✓" : step.id}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-semibold ${
                            active || completed
                              ? "text-white"
                              : "text-zinc-500"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    </button>

                    {index < steps.length - 1 && (
                      <div
                        className={`h-px w-6 shrink-0 ${
                          completed
                            ? "bg-green-500/40"
                            : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:p-8">
              {currentStep === 1 && (
                <div>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-400">
                      01
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {language === "RO"
                        ? "Datele vehiculului"
                        : "Vehicle information"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Completează informațiile principale despre vehicul."
                        : "Enter the main information about the vehicle."}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label={language === "RO" ? "Marcă" : "Make"}
                      placeholder="BMW"
                      value={vehicle.make}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          make: value,
                        })
                      }
                    />

                    <Field
                      label={language === "RO" ? "Model" : "Model"}
                      placeholder="320d F30"
                      value={vehicle.model}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          model: value,
                        })
                      }
                    />

                    <Field
                      label={language === "RO" ? "An" : "Year"}
                      placeholder="2016"
                      value={vehicle.year}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          year: value,
                        })
                      }
                    />

                    <Field
                      label={language === "RO" ? "Motor" : "Engine"}
                      placeholder="2.0 Diesel"
                      value={vehicle.engine}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          engine: value,
                        })
                      }
                    />

                    <Field
                      label={
                        language === "RO"
                          ? "Putere originală"
                          : "Original power"
                      }
                      placeholder="190 HP"
                      value={vehicle.power}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          power: value,
                        })
                      }
                    />

                    <Field
                      label={
                        language === "RO"
                          ? "Transmisie"
                          : "Transmission"
                      }
                      placeholder="Automatic"
                      value={vehicle.transmission}
                      onChange={(value) =>
                        setVehicle({
                          ...vehicle,
                          transmission: value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-400">
                      02
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      ECU / TCU
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Adaugă informațiile disponibile despre controler."
                        : "Add any available controller information."}
                    </p>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {["ECU", "TCU"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setEcu({
                            ...ecu,
                            type,
                          })
                        }
                        className={`rounded-2xl border px-5 py-4 font-semibold transition ${
                          ecu.type === type
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                            : "border-white/10 bg-white/[0.03] text-zinc-500 hover:bg-white/[0.06]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label={
                        language === "RO"
                          ? "Producător controler"
                          : "Controller manufacturer"
                      }
                      placeholder="Bosch"
                      value={ecu.manufacturer}
                      onChange={(value) =>
                        setEcu({
                          ...ecu,
                          manufacturer: value,
                        })
                      }
                    />

                    <Field
                      label={
                        language === "RO"
                          ? "Model controler"
                          : "Controller model"
                      }
                      placeholder="EDC17"
                      value={ecu.model}
                      onChange={(value) =>
                        setEcu({
                          ...ecu,
                          model: value,
                        })
                      }
                    />

                    <Field
                      label="Software"
                      placeholder="SW number"
                      value={ecu.software}
                      onChange={(value) =>
                        setEcu({
                          ...ecu,
                          software: value,
                        })
                      }
                    />

                    <Field
                      label="Hardware"
                      placeholder="HW number"
                      value={ecu.hardware}
                      onChange={(value) =>
                        setEcu({
                          ...ecu,
                          hardware: value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-400">
                      03
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {language === "RO"
                        ? "Încarcă fișierul original"
                        : "Upload original file"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Încarcă fișierul original citit din ECU sau TCU."
                        : "Upload the original file read from the ECU or TCU."}
                    </p>
                  </div>

                  <label className="group flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center transition hover:border-blue-500/40 hover:bg-blue-500/[0.03]">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          setFileName(file.name);
                        }
                      }}
                    />

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-3xl text-blue-400">
                      ↑
                    </div>

                    <p className="mt-6 text-lg font-semibold">
                      {fileName ||
                        (language === "RO"
                          ? "Selectează fișierul"
                          : "Choose your file")}
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Apasă pentru a selecta fișierul original de pe dispozitiv."
                        : "Click to select the original file from your device."}
                    </p>

                    {fileName && (
                      <span className="mt-5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                        ✓{" "}
                        {language === "RO"
                          ? "Fișier selectat"
                          : "File selected"}
                      </span>
                    )}
                  </label>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-400">
                      04
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {language === "RO"
                        ? "Selectează serviciile"
                        : "Select services"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Selectează serviciile necesare pentru această comandă."
                        : "Choose the services required for this order."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {services.map((service) => {
                      const selected =
                        selectedServices.includes(service.id);

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            toggleService(service.id)
                          }
                          className={`flex w-full items-start justify-between gap-5 rounded-2xl border p-5 text-left transition ${
                            selected
                              ? "border-blue-500/30 bg-blue-500/[0.08]"
                              : "border-white/10 bg-black/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex min-w-0 gap-4">
                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs ${
                                selected
                                  ? "border-blue-500 bg-blue-600 text-white"
                                  : "border-white/15 text-transparent"
                              }`}
                            >
                              ✓
                            </span>

                            <div>
                              <p className="font-semibold">
                                {service.name}
                              </p>

                              <p className="mt-2 text-sm leading-6 text-zinc-500">
                                {service.description}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 font-semibold">
                            €{service.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-400">
                      05
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {language === "RO"
                        ? "Verifică comanda"
                        : "Review your order"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {language === "RO"
                        ? "Verifică informațiile înainte de a continua spre checkout."
                        : "Review the information before continuing to checkout."}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <ReviewSection
                      title={
                        language === "RO"
                          ? "Vehicul"
                          : "Vehicle"
                      }
                    >
                      <ReviewRow
                        label={
                          language === "RO"
                            ? "Vehicul"
                            : "Vehicle"
                        }
                        value={`${vehicle.make || "—"} ${
                          vehicle.model || ""
                        }`}
                      />

                      <ReviewRow
                        label={language === "RO" ? "An" : "Year"}
                        value={vehicle.year || "—"}
                      />

                      <ReviewRow
                        label={language === "RO" ? "Motor" : "Engine"}
                        value={vehicle.engine || "—"}
                      />

                      <ReviewRow
                        label={
                          language === "RO"
                            ? "Transmisie"
                            : "Transmission"
                        }
                        value={vehicle.transmission || "—"}
                      />
                    </ReviewSection>

                    <ReviewSection title="ECU / TCU">
                      <ReviewRow
                        label="Type"
                        value={ecu.type}
                      />

                      <ReviewRow
                        label={
                          language === "RO"
                            ? "Controler"
                            : "Controller"
                        }
                        value={`${ecu.manufacturer || "—"} ${
                          ecu.model || ""
                        }`}
                      />

                      <ReviewRow
                        label="Software"
                        value={ecu.software || "—"}
                      />

                      <ReviewRow
                        label="Hardware"
                        value={ecu.hardware || "—"}
                      />
                    </ReviewSection>

                    <ReviewSection
                      title={
                        language === "RO"
                          ? "Fișier"
                          : "File"
                      }
                    >
                      <ReviewRow
                        label={
                          language === "RO"
                            ? "Fișier original"
                            : "Original file"
                        }
                        value={fileName || "—"}
                      />
                    </ReviewSection>

                    <ReviewSection
                      title={
                        language === "RO"
                          ? "Servicii"
                          : "Services"
                      }
                    >
                      {selectedServices.length === 0 ? (
                        <p className="text-sm text-zinc-600">
                          {language === "RO"
                            ? "Niciun serviciu selectat."
                            : "No services selected."}
                        </p>
                      ) : (
                        services
                          .filter((service) =>
                            selectedServices.includes(service.id),
                          )
                          .map((service) => (
                            <ReviewRow
                              key={service.id}
                              label={service.name}
                              value={`€${service.price.toFixed(2)}`}
                            />
                          ))
                      )}
                    </ReviewSection>
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ←{" "}
                  {language === "RO"
                    ? "Înapoi"
                    : "Back"}
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
                  >
                    {language === "RO"
                      ? "Continuă"
                      : "Continue"}{" "}
                    →
                  </button>
                ) : (
                  <Link
                    href="/checkout"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold transition hover:bg-blue-500"
                  >
                    {language === "RO"
                      ? "Continuă spre checkout"
                      : "Continue to checkout"}{" "}
                    →
                  </Link>
                )}
              </div>
            </div>

            <aside>
              <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#0d1118] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  {language === "RO"
                    ? "Rezumat"
                    : "Order summary"}
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs text-zinc-600">
                      {language === "RO" ? "Vehicul" : "Vehicle"}
                    </p>

                    <p className="mt-1 font-medium">
                      {vehicle.make || vehicle.model
                        ? `${vehicle.make} ${vehicle.model}`
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-600">
                      ECU / TCU
                    </p>

                    <p className="mt-1 font-medium">
                      {ecu.manufacturer || ecu.model
                        ? `${ecu.manufacturer} ${ecu.model}`
                        : ecu.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-600">
                      {language === "RO" ? "Fișier" : "File"}
                    </p>

                    <p className="mt-1 truncate font-medium">
                      {fileName || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-600">
                      {language === "RO"
                        ? "Servicii"
                        : "Services"}
                    </p>

                    <p className="mt-1 font-medium">
                      {selectedServices.length}
                    </p>
                  </div>
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-600">
                      {language === "RO"
                        ? "Total estimat"
                        : "Estimated total"}
                    </p>

                    <p className="mt-1 text-xs text-zinc-700">
                      EUR
                    </p>
                  </div>

                  <p className="text-3xl font-semibold tracking-tight">
                    €{total.toFixed(2)}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.05] p-4">
                  <p className="text-xs leading-5 text-zinc-500">
                    {language === "RO"
                      ? "Poți verifica toate informațiile înainte de autorizarea plății."
                      : "You can review all information before payment authorization."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function Field({
  label,
  placeholder,
  value,
  onChange,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-400">
        {label}
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/40 focus:bg-black/30"
      />
    </label>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="mb-4 font-semibold">{title}</p>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 text-sm">
      <span className="text-zinc-600">
        {label}
      </span>

      <span className="text-right font-medium text-zinc-300">
        {value}
      </span>
    </div>
  );
}