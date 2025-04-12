
import { MapPin, Clock, Calendar } from "lucide-react";
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
import { MosqueProps } from "@/components/MosqueCard";

interface PrayerTimesCardProps {
  mosque: MosqueProps;
}

const PrayerTimesCard = ({ mosque }: PrayerTimesCardProps) => {
  return (
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
  );
};

export default PrayerTimesCard;
