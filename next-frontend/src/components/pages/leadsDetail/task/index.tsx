"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/ui/datepicker";
import TimePicker from "@/components/ui/ui/timepicker"
import * as RadixSelect from '@radix-ui/react-select'; 
import { FiPlus, FiX } from "react-icons/fi";
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/components/ui/validationSchema";

type FormData = z.infer<typeof TaskSchema>;

const TaskInput: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false); 

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      tasks: [],
    },
    resolver: zodResolver(TaskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="space-y-4">
      {/* Search Bar Section */}
      {isSearchActive ? (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <Input placeholder="Search tasks..." className="w-full" />
          <FiX
            className="cursor-pointer ml-2"
            onClick={() => setIsSearchActive(false)} 
          />
        </div>
      ) : (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <span className="mr-2">Tasks</span>

          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={() => append({
                description: "",
                date: "",
                time: "",
                assignUser: "",
              })}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiPlus />
            </Button>
          </div>
        </div>
      )}

      {/* Task Form Section */}
      {!isSearchActive && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md space-y-2">
              <div>
                <label htmlFor={`tasks.${index}.description`} className="block text-sm font-medium">
                  Task Description
                </label>
                <Controller
                  name={`tasks.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Task Description"
                      aria-invalid={!!errors.tasks?.[index]?.description}
                    />
                  )}
                />
                {errors.tasks?.[index]?.description && (
                  <p className="text-red-600 text-sm">{errors.tasks[index].description?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`tasks.${index}.date`} className="block text-sm font-medium">
                  Date
                </label>
                <DatePicker
                  name={`tasks.${index}.date`}
                  control={control}
                  placeholder="Select Date"
                  ariaInvalid={!!errors.tasks?.[index]?.date}
                />
                {errors.tasks?.[index]?.date && (
                  <p className="text-red-600 text-sm">{errors.tasks[index].date?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`tasks.${index}.time`} className="block text-sm font-medium">
                  Time
                </label>
                <TimePicker
                  name={`tasks.${index}.time`}
                  control={control}
                  placeholder="Select Time"
                  ariaInvalid={!!errors.tasks?.[index]?.time}
                />
                {errors.tasks?.[index]?.time && (
                  <p className="text-red-600 text-sm">{errors.tasks[index].time?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`tasks.${index}.assignUser`} className="block text-sm font-medium">
                  Assign User
                </label>
                <Controller
                  name={`tasks.${index}.assignUser`}
                  control={control}
                  render={({ field }) => (
                    <RadixSelect.Root {...field}>
                      <RadixSelect.Trigger className="inline-flex items-center justify-between px-4 py-2 border rounded-md bg-white w-full">
                        <RadixSelect.Value placeholder="Select a user" />
                        <RadixSelect.Icon className="ml-2">
                          <ChevronDownIcon />
                        </RadixSelect.Icon>
                      </RadixSelect.Trigger>
                      <RadixSelect.Portal>
                        <RadixSelect.Content className="overflow-hidden bg-white border rounded-md shadow-lg">
                          <RadixSelect.Viewport>
                            <RadixSelect.Item value="user2" className="px-4 py-2 hover:bg-gray-100">
                              <RadixSelect.ItemText>User 1</RadixSelect.ItemText>
                              <RadixSelect.ItemIndicator className="ml-auto">
                                <CheckIcon />
                              </RadixSelect.ItemIndicator>
                            </RadixSelect.Item>
                          </RadixSelect.Viewport>
                        </RadixSelect.Content>
                      </RadixSelect.Portal>
                    </RadixSelect.Root>
                  )}
                />
                {errors.tasks?.[index]?.assignUser && (
                  <p className="text-red-600 text-sm">{errors.tasks[index].assignUser?.message}</p>
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

export default TaskInput;
