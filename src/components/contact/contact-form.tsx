"use client";

import {
  useMemo,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations();

  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, { message: t("contactPage.form.required") }),
        email: z
          .string()
          .min(1, { message: t("contactPage.form.required") })
          .email({ message: t("contactPage.form.invalidEmail") }),
        subject: z.string().min(1, { message: t("contactPage.form.required") }),
        message: z
          .string()
          .min(10, { message: t("contactPage.form.messageTooShort") }),
      }),
    [t]
  );

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = Object.keys(errors).length > 0;

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/`/g, "&#96;")
      .replace(/\(/g, "&#40;")
      .replace(/\)/g, "&#41;");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = useCallback((): boolean => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData, contactFormSchema]);

  useEffect(() => {
    if (
      formData.name ||
      formData.email ||
      formData.subject ||
      formData.message
    ) {
      validateForm();
    }
  }, [formData, validateForm]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || hasErrors) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send email");

      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success(t("contactPage.form.success"));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contactPage.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full rounded-2xl bg-white p-8 shadow-md"
      role="form"
      aria-labelledby="contact-form-title"
    >
      <h2
        id="contact-form-title"
        className="pb-6 text-2xl font-bold text-gray-800"
      >
        {t("contactPage.form.title")}
      </h2>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        aria-label={t("contactPage.form.title")}
        noValidate
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {t("contactPage.form.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} bg-white p-3 text-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none`}
              placeholder={t("contactPage.form.name")}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              required
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {t("contactPage.form.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} bg-white p-3 text-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none`}
              placeholder={t("contactPage.form.email")}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("contactPage.form.subject")}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full rounded-lg border ${errors.subject ? "border-red-500" : "border-gray-300"} bg-white p-3 text-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none`}
            placeholder={t("contactPage.form.subject")}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            aria-invalid={!!errors.subject}
            required
          />
          {errors.subject && (
            <p
              id="subject-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.subject}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("contactPage.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} bg-white p-3 text-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none`}
            placeholder={t("contactPage.form.message")}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
            required
          ></textarea>
          {errors.message && (
            <p
              id="message-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting || hasErrors}
            className="group flex cursor-pointer items-center gap-2 rounded-md border-2 border-black bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            aria-disabled={isSubmitting || hasErrors}
          >
            {isSubmitting
              ? t("contactPage.form.sending")
              : t("contactPage.form.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
