
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignupTable from "@/components/analytics/SignupTable";

const SignupsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Business Signups</CardTitle>
          <CardDescription>Detailed breakdown of new businesses</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupTable limit={10} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupsTab;
