
import { format } from "date-fns";
import { Check, Clock } from "lucide-react";
import { Membership, planDetails } from "@/types/membershipTypes";

interface CurrentMembershipProps {
  membership: Membership;
}

const CurrentMembership = ({ membership }: CurrentMembershipProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'expired':
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Current Membership</h3>
          <p className="capitalize text-muslim-teal font-medium">
            {planDetails[membership.plan_type].name} Plan
          </p>
        </div>
        <div className="text-right">
          <div className={`font-medium ${getStatusColor(membership.status)}`}>
            {membership.status === 'active' && <span className="flex items-center"><Check className="h-4 w-4 mr-1" /> Active</span>}
            {membership.status === 'pending' && <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Pending</span>}
            {membership.status === 'expired' && "Expired"}
            {membership.status === 'cancelled' && "Cancelled"}
          </div>
          {membership.end_date && (
            <p className="text-sm text-gray-500">
              Expires: {format(new Date(membership.end_date), 'MMM d, yyyy')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentMembership;
