import { Suspense, useState } from "react";
import { Card } from "@/components/ui/card";
import { FiPhone, FiMail, FiFileText } from "react-icons/fi";
import { Button } from "@/components/custom/button";
import CallsComponent from "../Calls";
import EmailsComponent from "../Emails";
import NotesComponent from "../nodes";
import UserDropdown from "../userDropdown";

interface TimelineItem {
  id: number;
  icon: string;
  text: string;
  date: string;
}

interface TimelineProps {
  data: TimelineItem[];
  emails: any[]; // Add emails data prop as well
  leadId: number; // Add leadId prop
}

const Timeline: React.FC<TimelineProps> = ({ data, emails, leadId }) => {
  const [selectedView, setSelectedView] = useState<string>("notes"); // Default to showing "Notes"

  const renderContent = () => {
    switch (selectedView) {
      case "notes":
        return <NotesComponent leadId={leadId} />;
      case "calls":
        return <CallsComponent data={data} />;
      case "emails":
        return <EmailsComponent emails={emails} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Buttons aligned above the card */}
      <div className="flex gap-2 justify-start mb-4">
        <Button
          variant="outline"
          size="sm"
          className={`h-8 flex items-center gap-2 ${
            selectedView === "notes" ? "ring-2 ring-gray-600" : ""
          } bg-black text-white hover:bg-gray-800 hover:text-white`}
          onClick={() => setSelectedView("notes")}
        >
          <FiFileText className="h-4 w-4" />
          Note
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 flex items-center gap-2 ${
            selectedView === "calls" ? "ring-2 ring-gray-600" : ""
          } bg-black text-white hover:bg-gray-800 hover:text-white`}
          onClick={() => setSelectedView("calls")}
        >
          <FiPhone className="h-4 w-4" />
          Call
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 flex items-center gap-2 ${
            selectedView === "emails" ? "ring-2 ring-gray-600" : ""
          } bg-black text-white hover:bg-gray-800 hover:text-white`}
          onClick={() => setSelectedView("emails")}
        >
          <FiMail className="h-4 w-4" />
          Email
        </Button>
        <Suspense>
          <UserDropdown />
        </Suspense>
      </div>

      {/* Timeline card */}
      <Card className="p-4">{renderContent()}</Card>
    </>
  );
};

export default Timeline;
