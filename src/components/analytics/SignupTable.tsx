
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SignupTableProps {
  limit?: number;
}

const SignupTable = ({ limit = 5 }: SignupTableProps) => {
  // Mock data - would come from an API in a real application
  const signups = [
    { 
      id: "1", 
      businessName: "Halal Delights", 
      owner: "Ahmed Rahman", 
      location: "London, UK", 
      date: "2025-04-11", 
      plan: "Premium", 
      beta: true 
    },
    { 
      id: "2", 
      businessName: "Muslim Travel Co", 
      owner: "Fatima Ali", 
      location: "New York, USA", 
      date: "2025-04-11", 
      plan: "Enterprise", 
      beta: true 
    },
    { 
      id: "3", 
      businessName: "Modest Fashion House", 
      owner: "Sara Abdullah", 
      location: "Dubai, UAE", 
      date: "2025-04-10", 
      plan: "Basic", 
      beta: true 
    },
    { 
      id: "4", 
      businessName: "Baraka Investments", 
      owner: "Yusuf Ibrahim", 
      location: "Kuala Lumpur, Malaysia", 
      date: "2025-04-10", 
      plan: "Premium", 
      beta: true 
    },
    { 
      id: "5", 
      businessName: "Al Noor Academy", 
      owner: "Layla Hassan", 
      location: "Toronto, Canada", 
      date: "2025-04-09", 
      plan: "Enterprise", 
      beta: true 
    },
    { 
      id: "6", 
      businessName: "Halal Meat Suppliers", 
      owner: "Mohammed Ali", 
      location: "London, UK", 
      date: "2025-04-09", 
      plan: "Basic", 
      beta: false 
    },
    { 
      id: "7", 
      businessName: "Islamic Books & Gifts", 
      owner: "Aisha Khan", 
      location: "Sydney, Australia", 
      date: "2025-04-08", 
      plan: "Premium", 
      beta: true 
    },
    { 
      id: "8", 
      businessName: "Al-Baraka Restaurant", 
      owner: "Karim Saleh", 
      location: "New York, USA", 
      date: "2025-04-08", 
      plan: "Premium", 
      beta: false 
    },
    { 
      id: "9", 
      businessName: "Muslim Tech Solutions", 
      owner: "Omar Farouk", 
      location: "Dubai, UAE", 
      date: "2025-04-07", 
      plan: "Enterprise", 
      beta: true 
    },
    { 
      id: "10", 
      businessName: "Hijab Fashion", 
      owner: "Nadia Rahman", 
      location: "Lahore, Pakistan", 
      date: "2025-04-07", 
      plan: "Basic", 
      beta: true 
    }
  ];

  const limitedSignups = limit ? signups.slice(0, limit) : signups;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Business Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {limitedSignups.map((signup) => (
          <TableRow key={signup.id}>
            <TableCell className="font-medium">{signup.businessName}</TableCell>
            <TableCell>{signup.owner}</TableCell>
            <TableCell>{signup.location}</TableCell>
            <TableCell>{new Date(signup.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge className={
                signup.plan === "Basic" ? "bg-gray-500" : 
                signup.plan === "Premium" ? "bg-muslim-teal" : "bg-muslim-blue"
              }>
                {signup.plan}
              </Badge>
            </TableCell>
            <TableCell>
              {signup.beta ? (
                <Badge className="bg-muslim-gold text-muslim-dark">Beta Program</Badge>
              ) : (
                <Badge variant="outline">Regular</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SignupTable;
