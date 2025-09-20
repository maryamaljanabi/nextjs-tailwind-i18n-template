"use client";

import { useMemo, useState, useCallback, FormEvent, FocusEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { FormField } from "../ui/form-field";

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
  // this state tracks first submit
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const hasErrors = Object.values(errors).some((error) => error !== undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (hasSubmitted) validateForm({ ...formData, [name]: value });
  };

  const validateForm = useCallback(
    (data = formData): boolean => {
      try {
        contactFormSchema.parse(data);
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
    },
    [formData, contactFormSchema]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

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
      setHasSubmitted(false);
      setErrors({});
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
      className="w-full rounded-2xl bg-background p-8 shadow-md"
      role="form"
      aria-labelledby="contact-form-title"
    >
      <h2
        id="contact-form-title"
        className="pb-6 text-2xl font-bold text-primary"
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
          <FormField
            id="name"
            label={t("contactPage.form.name")}
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
          <FormField
            id="email"
            label={t("contactPage.form.email")}
            formData={formData}
            errors={errors}
            onChange={handleChange}
            type="email"
          />
        </div>

        <FormField
          id="subject"
          label={t("contactPage.form.subject")}
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        <FormField
          id="message"
          label={t("contactPage.form.message")}
          as="textarea"
          rows={4}
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        <div className="flex justify-start">
          <Button
            type="submit"
            disabled={isSubmitting || (hasSubmitted && hasErrors)}
            className="px-6 py-3"
          >
            {isSubmitting
              ? t("contactPage.form.sending")
              : t("contactPage.form.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}
