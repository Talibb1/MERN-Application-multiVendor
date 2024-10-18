import React from "react";
import { Card } from "@/components/ui/card";

const LeadProfileLoader = () => {
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 animate-pulse">
      <div className="w-full lg:w-1/3">
        <Card className="mb-4 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Lead Info</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-32">Company Name:</span>
              <div className="h-4 bg-slate-200 rounded w-48"></div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Status:</span>
              <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="mt-4 space-y-2">
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
        </Card>
      </div>
      <div className="w-full lg:w-2/3">
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-24"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeadProfileLoader;
