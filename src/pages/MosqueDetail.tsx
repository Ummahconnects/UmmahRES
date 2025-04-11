
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Calendar, Phone, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/Layout";
import { perthMosques } from "@/data/perthMosques";
import { mockMosques } from "@/pages/Mosques";
import { cn } from "@/lib/utils";

const MosqueDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Combine both mock and Perth mosques data
  const allMosques = [...mockMosques, ...perthMosques];
  const mosque = allMosques.find(m => m.id === id);

  if (!mosque) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-muslim-dark mb-4">Mosque Not Found</h1>
            <p className="text-gray-600 mb-6">The mosque you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/mosques">Back to Mosques</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            to="/mosques" 
            className="inline-flex items-center text-muslim-teal hover:text-muslim-teal/80 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Mosques
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden">
              <img
                src={mosque.image}
                alt={mosque.name}
                className="w-full h-full object-cover"
              />
              {mosque.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-muslim-gold text-white">Featured</Badge>
                </div>
              )}
              <div className={cn(
                "absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium",
                mosque.isOpen ? "bg-green-500" : "bg-red-500"
              )}>
                {mosque.isOpen ? "Open" : "Closed"}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-muslim-dark">{mosque.name}</h1>
              <div className="mt-2 flex items-center space-x-2">
                <Badge variant="outline">{mosque.type}</Badge>
                <div className="text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {mosque.address}
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Prayer Times</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prayer</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {'prayerTimes' in mosque && mosque.prayerTimes ? (
                      <>
                        <TableRow>
                          <TableCell className="font-medium">Fajr</TableCell>
                          <TableCell>{mosque.prayerTimes.fajr}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Dhuhr</TableCell>
                          <TableCell>{mosque.prayerTimes.dhuhr}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Asr</TableCell>
                          <TableCell>{mosque.prayerTimes.asr}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Maghrib</TableCell>
                          <TableCell>{mosque.prayerTimes.maghrib}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Isha</TableCell>
                          <TableCell>{mosque.prayerTimes.isha}</TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-gray-500">
                          Prayer times not available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {mosque.jumuahTime && (
                  <div className="mt-4 flex items-center text-muslim-dark font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    Jumu'ah Prayer: {mosque.jumuahTime}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Facilities & Services</h2>
                {mosque.facilities && mosque.facilities.length > 0 ? (
                  <ul className="space-y-2">
                    {mosque.facilities.map(facility => (
                      <li key={facility} className="flex items-start">
                        <Check className="h-5 w-5 text-muslim-teal mr-2 shrink-0 mt-0.5" />
                        <span>{facility}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No facilities information available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muslim-teal mr-2 shrink-0 mt-0.5" />
                    <span>{mosque.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-muslim-teal mr-2" />
                    <span>+61 8 1234 5678</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-muslim-teal mr-2" />
                    <a href="#" className="text-muslim-teal hover:underline">Visit Website</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button className="w-full">Get Directions</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MosqueDetail;
