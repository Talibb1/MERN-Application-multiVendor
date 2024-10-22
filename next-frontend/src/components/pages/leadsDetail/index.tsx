"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useGetLeadById } from "@/lib/hooks/api";
import ContactsInput from "./contact";
import OpportunityInput from "./opportunity";
import TaskInput from "./task";
import Timeline from "./timeline";
import LeadProfileLoader from "@/components/layouts/loader/LeadProfileLoader";
import { LeadData } from "./types";

const LeadProfile = () => {
  const params = useParams();
  const leadId = Number(params.id);
  const { data, error, isLoading } = useGetLeadById(leadId);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  const timelineData = [
    { id: 1, icon: "N", text: "Initial contact made", date: "2023-06-01" },
    { id: 2, icon: "E", text: "Sent introduction email", date: "2023-06-02" },
    { id: 3, icon: "C", text: "Discovery call completed", date: "2023-06-05" },
  ];

  const emailData = [
    { id: 1, subject: "Email subject" , date: "2023-06-01", body: "Email body" },
    { id: 2, subject: "Email subject" , date: "2023-06-02", body: "Email body" },
    { id: 3, subject: "Email subject" , date: "2023-06-05", body: "Email body" },
 
  ];
  useEffect(() => {
    if (data) {
      const {
        id,
        companyName,
        status,
        industry,
        source,
        phone,
        email,
        website,
        description,
        contacts,
      } = data.data;
      setLeadData({
        id,
        companyName,
        status,
        industry,
        source,
        phone,
        email,
        website,
        description,
        contacts,
      });
    }
  }, [data]);

  if (isLoading)
    return (
      <div>
        <LeadProfileLoader />
      </div>
    );

  if (error) {
    const errorMessage =
      "data" in error
        ? (error.data as { message?: string }).message || "An error occurred"
        : "An error occurred";
    return <div>Error fetching lead data: {errorMessage}</div>;
  }

  if (!leadData) return <div>No lead data available</div>;

  const { id, companyName, status, contacts } = leadData;
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      <div className="w-full lg:w-1/3">
        <Card className="mb-4 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Lead Info</h2>

          <div className="mt-4 space-y-4">
            {/* Company Name */}
            <div className="flex items-center">
              <span className="font-semibold w-32">Company Name:</span>
              <p className="text-gray-700">{companyName || "N/A"}</p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span className="font-semibold w-32">Status:</span>
              <p
                className={`${
                  status === "Active" ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {status || "N/A"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mt-4 space-y-2">
            {/* Contacts Input */}
            <div>
              <ContactsInput leadData={contacts} leadId={id} />
            </div>
            {/* Opportunity Input */}
            <div>
              <OpportunityInput />
            </div>
            {/* Task Input */}
            <div>
              <TaskInput />
            </div>
          </div>
        </Card>
      </div>

      <div className="w-full lg:w-2/3">
        <Timeline data={timelineData} emails={emailData} leadId={id} />
      </div>
    </div>
  );
};

export default LeadProfile;
