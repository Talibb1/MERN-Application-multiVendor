"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Select, } from "@/components/ui/ui/select";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpportunitySchema } from "@/components/ui/validationSchema";


type FormData = z.infer<typeof OpportunitySchema>;

const OpportunityInput: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false); // State to handle search bar visibility

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      opportunities: [],
    },
    resolver: zodResolver(OpportunitySchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "opportunities",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar Section */}
      {isSearchActive ? (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <Input placeholder="Search opportunities..." className="w-full" />
          <FiX
            className="cursor-pointer ml-2"
            onClick={() => setIsSearchActive(false)} // Close the search bar
          />
        </div>
      ) : (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <span className="mr-2">Opportunities</span>

          <div className="ml-auto flex items-center gap-2">
            <FiSearch
              className="cursor-pointer"
              onClick={() => setIsSearchActive(true)} // Open the search bar
            />
            <Button
              onClick={() => append({
                status: "",
                estimatedClose: "",
                value: 0,
                contact: "",
                user: "",
                notes: "",
              })}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiPlus />
            </Button>
          </div>
        </div>
      )}

      {/* Opportunity Form Section */}
      {!isSearchActive && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md space-y-2">
              {/* <div>
                <label htmlFor={`opportunities.${index}.status`} className="block text-sm font-medium">
                  Status
                </label>
                <Controller
                  name={`opportunities.${index}.status`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      aria-invalid={!!errors.opportunities?.[index]?.status}
                    >
                      <SelectOption value="Prospecting">Prospecting</SelectOption>
                      <SelectOption value="Negotiation">Negotiation</SelectOption>
                      <SelectOption value="Closed Won">Closed Won</SelectOption>
                      <SelectOption value="Closed Lost">Closed Lost</SelectOption>
                    </Select>
                  )}
                />
                {errors.opportunities?.[index]?.status && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].status?.message}</p>
                )}
              </div> */}

              <div>
                <label htmlFor={`opportunities.${index}.estimatedClose`} className="block text-sm font-medium">
                  Estimated Close
                </label>
                <Controller
                  name={`opportunities.${index}.estimatedClose`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Estimated Close Date"
                      aria-invalid={!!errors.opportunities?.[index]?.estimatedClose}
                    />
                  )}
                />
                {errors.opportunities?.[index]?.estimatedClose && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].estimatedClose?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`opportunities.${index}.value`} className="block text-sm font-medium">
                  Value
                </label>
                <Controller
                  name={`opportunities.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      placeholder="Value"
                      aria-invalid={!!errors.opportunities?.[index]?.value}
                    />
                  )}
                />
                {errors.opportunities?.[index]?.value && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].value?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`opportunities.${index}.contact`} className="block text-sm font-medium">
                  Contact
                </label>
                <Controller
                  name={`opportunities.${index}.contact`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Contact Name"
                      aria-invalid={!!errors.opportunities?.[index]?.contact}
                    />
                  )}
                />
                {errors.opportunities?.[index]?.contact && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].contact?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`opportunities.${index}.user`} className="block text-sm font-medium">
                  User
                </label>
                <Controller
                  name={`opportunities.${index}.user`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="User"
                      aria-invalid={!!errors.opportunities?.[index]?.user}
                    />
                  )}
                />
                {errors.opportunities?.[index]?.user && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].user?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`opportunities.${index}.notes`} className="block text-sm font-medium">
                  Notes
                </label>
                <Controller
                  name={`opportunities.${index}.notes`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Notes"
                      aria-invalid={!!errors.opportunities?.[index]?.notes}
                    />
                  )}
                />
                {errors.opportunities?.[index]?.notes && (
                  <p className="text-red-600 text-sm">{errors.opportunities[index].notes?.message}</p>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="submit" className="bg-black text-white">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => remove(index)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default OpportunityInput;
