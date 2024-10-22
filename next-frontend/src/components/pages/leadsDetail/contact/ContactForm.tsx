import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/ui/input";
import { ContactSchema } from "./ContactSchema";
import {
  useCreateContact,
  useUpdateContact,
} from "@/lib/hooks/api";
import * as z from "zod";

type FormData = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  leadId: number; 
  contactsData?: FormData;
  onCancel: () => void;
  isEdit?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  leadId,
  contactsData,
  onCancel,
  isEdit,
}) => {
  const [showMoreFields, setShowMoreFields] = useState(false);
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: contactsData || {
      contactName: "",
      title: "",
      contactDetails: "",
      email: "",
      phone: "",
      position: "",
    },
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: FormData) => {
    const contactData = { ...data, leadId }; 

    if (isEdit && contactsData?.id) {
      await updateContact.mutateAsync({ id: contactsData.id, ...contactData });
    } else {
      await createContact.mutateAsync(contactData); 
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium">
          Name
        </label>
        <Controller
          name="contactName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Name"
              aria-invalid={!!errors.contactName}
            />
          )}
        />
        {errors.contactName && (
          <p className="text-red-600 text-sm">{errors.contactName?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Title (optional)"
              aria-invalid={!!errors.title}
            />
          )}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="contactDetails" className="block text-sm font-medium">
          Contact Details (optional)
        </label>
        <Controller
          name="contactDetails"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Contact Details"
              aria-invalid={!!errors.contactDetails}
            />
          )}
        />
        {errors.contactDetails && (
          <p className="text-red-600 text-sm">
            {errors.contactDetails?.message}
          </p>
        )}
      </div>
      {!showMoreFields && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowMoreFields(true)}
            className="mt-4"
          >
            Show More Fields
          </Button>
        </div>
      )}
      {showMoreFields && (
        <>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email (optional)"
                  aria-invalid={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Phone (optional)"
                  aria-invalid={!!errors.phone}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium">
              Position
            </label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Position (optional)"
                  aria-invalid={!!errors.position}
                />
              )}
            />
            {errors.position && (
              <p className="text-red-600 text-sm">{errors.position?.message}</p>
            )}
          </div>
        </>
      )}
      
      <div className="flex gap-2 justify-end">
        <Button type="submit" className="bg-black text-white">
          {isEdit ? "Update" : "Create"} Contact
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
