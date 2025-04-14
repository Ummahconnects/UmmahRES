
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const BetaTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Beta Program Progress</CardTitle>
          <CardDescription>Track cities reaching 100 business benchmark</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Beta Signups</TableHead>
                <TableHead>Discount Applied</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">London</TableCell>
                <TableCell>United Kingdom</TableCell>
                <TableCell>82</TableCell>
                <TableCell>£1,640</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </TableCell>
                <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">New York</TableCell>
                <TableCell>United States</TableCell>
                <TableCell>67</TableCell>
                <TableCell>$1,340</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </TableCell>
                <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dubai</TableCell>
                <TableCell>UAE</TableCell>
                <TableCell>53</TableCell>
                <TableCell>$1,060</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '53%' }}></div>
                  </div>
                </TableCell>
                <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kuala Lumpur</TableCell>
                <TableCell>Malaysia</TableCell>
                <TableCell>46</TableCell>
                <TableCell>$920</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </TableCell>
                <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Toronto</TableCell>
                <TableCell>Canada</TableCell>
                <TableCell>100</TableCell>
                <TableCell>$2,000</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-muslim-gold h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </TableCell>
                <TableCell><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Completed</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetaTab;
