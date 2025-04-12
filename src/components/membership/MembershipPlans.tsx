
import { useState } from "react";
import { planDetails } from "@/types/membershipTypes";
import BillingCycleTabs from "./BillingCycleTabs";
import PlanCard from "./PlanCard";

const MembershipPlans = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <BillingCycleTabs 
        value={billingCycle}
        onChange={setBillingCycle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlanCard 
          planType="basic"
          plan={planDetails.basic}
          billingCycle={billingCycle}
          onSelect={() => console.log("Basic selected")}
        />

        <PlanCard 
          planType="premium"
          plan={planDetails.premium}
          billingCycle={billingCycle}
          onSelect={() => console.log("Premium selected")}
        />

        <PlanCard 
          planType="enterprise"
          plan={planDetails.enterprise}
          billingCycle={billingCycle}
          onSelect={() => console.log("Enterprise selected")}
        />
      </div>
    </>
  );
};

export default MembershipPlans;
