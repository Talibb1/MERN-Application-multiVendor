const EmailsComponent = ({ emails }: { emails: any[] }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Emails</h2>
    {emails && emails.length > 0 ? ( 
      emails.map((email) => (
        <div key={email.id} className="mb-4">
          <p className="font-medium">{email.subject}</p>
          <p className="text-sm text-gray-500">{email.date}</p>
          <p className="mt-2">{email.body}</p>
        </div>
      ))
    ) : (
      <p>No emails available</p> 
    )}
  </div>
);

export default EmailsComponent;
