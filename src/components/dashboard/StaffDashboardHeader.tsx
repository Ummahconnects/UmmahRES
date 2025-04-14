
import { ArrowUpRight, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StaffDashboardHeaderProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const StaffDashboardHeader = ({ dateRange }: StaffDashboardHeaderProps) => {
  const securityIssues = [
    { 
      id: 1, 
      title: "Auth OTP Long Expiry", 
      description: "OTP expiry exceeds recommended threshold", 
      severity: "warning" 
    },
    { 
      id: 2, 
      title: "Leaked Password Protection Disabled", 
      description: "Leaked password protection is currently disabled", 
      severity: "high" 
    }
  ];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-muslim-dark">Staff Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor business signups, growth metrics, and platform analytics</p>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="gap-2 mt-4 md:mt-0">
                <Shield className="h-4 w-4" />
                <span>Security Status</span>
                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
                  {securityIssues.length}
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Security Warnings</h4>
                {securityIssues.map(issue => (
                  <div key={issue.id} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${issue.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                    <div>
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-xs text-gray-500">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {securityIssues.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="font-medium text-amber-800">Security warnings detected</h3>
            <p className="text-sm text-amber-700">
              {securityIssues.length} security {securityIssues.length === 1 ? 'issue' : 'issues'} require your attention. 
              Please review the security settings.
            </p>
          </div>
          <Button variant="outline" size="sm" className="flex-shrink-0 border-amber-300 hover:bg-amber-100">
            View Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default StaffDashboardHeader;
