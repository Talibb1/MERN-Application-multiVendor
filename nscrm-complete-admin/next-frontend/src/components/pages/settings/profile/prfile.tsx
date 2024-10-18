"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/ui/input";
import { Button } from "@/components/custom/button";
import { useEffect } from "react";
import Image from "next/image";
import { ProfileSchema } from "./validationschema";
import { useUpdateUser, useDeleteUser, useGetUser } from "@/lib/hooks/api";
import { ToastProvider, notify } from "@/components/ui/Toast";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function Profile({ userId }: { userId: number }) {
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { data: userData, isLoading } = useGetUser();
  const user = userData?.user;
  console.log("userData:",userData)

  const rolesOptions = ["Admin", "User", "Super User", "Restricted User"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      roles: [],
      avatar: null,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phoneNumber", user?.phoneNumber);
      setValue("address", user?.address);
      setValue("roles", user?.roles);
      setValue("avatar", user?.avatar);
    }
  }, [user, setValue]);

  const onSubmit = (data: any) => {
    updateUser({
      id: userId,
      user: data,
    });
    notify("success", "Profile updated successfully!");
  };

  const handleDelete = () => {
    deleteUser(userId);
    notify("success", "User deleted successfully!");
  };

  return (
    <>
      <ToastProvider />
      <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24 group">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("avatar")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setValue("avatar", reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <CiCirclePlus className="absolute -bottom-2 -left-2 w-5 h-5 text-gray-600 cursor-pointer" />

            <Image
              src={watch("avatar") || "/avatar_12.jpg"}
              alt="User avatar"
              width={96}
              height={96}
              className="rounded-full object-cover transition-opacity duration-200 hover:opacity-70"
            />
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-300 hover:border-gray-500 flex items-center justify-center">
              <span className="hidden group-hover:block">
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m-3-3H9"
                  />
                </svg>
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Allowed *.jpeg, *.jpg, *.png</p>
          <p className="text-xs text-gray-400">Max size of 3MB</p>

          {/* Delete User Button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            Delete User
          </Button>
        </div>

        {/* Right Panel - Form */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm text-gray-600">
                  First Name
                </label>
                <Input id="firstName" type="text" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm text-gray-600">
                  Last Name
                </label>
                <Input id="lastName" type="text" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email Address
                </label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-sm text-gray-600">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="text"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Address (Textarea) */}
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm text-gray-600">
                  Address
                </label>
                <textarea
                  id="address"
                  {...register("address")}
                  className="border rounded-md p-2 h-28 resize-none"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Roles (Dropdown) */}
              <div className="flex flex-col">
                <label htmlFor="roles" className="text-sm text-gray-600">
                  Roles
                </label>
                <select
                  id="roles"
                  {...register("roles")}
                  className="border rounded-md p-2"
                >
                  {rolesOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.roles && (
                  <p className="text-red-500 text-xs">{errors.roles.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
