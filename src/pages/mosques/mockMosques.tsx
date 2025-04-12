
import { MosqueProps } from "@/components/MosqueCard";
import { perthMosques } from "@/data/perthMosques";

export const mockMosques: MosqueProps[] = [
  {
    id: "1",
    name: "Masjid Al-Noor",
    type: "Islamic Center",
    address: "123 Faith Ave, Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1585129918712-9ed816168e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:30 PM",
    isOpen: true,
    featured: true,
    facilities: ["Women's Section", "Weekend School", "Parking"]
  },
  {
    id: "2",
    name: "Masjid Al-Huda",
    type: "Sunni Mosque",
    address: "456 Peace St, Chicago, IL",
    image: "https://images.unsplash.com/photo-1619982690218-7ad5365b2767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:00 PM",
    isOpen: true,
    facilities: ["Islamic Library", "Funeral Services"]
  },
  {
    id: "3",
    name: "Islamic Foundation Center",
    type: "Islamic Center",
    address: "789 Unity Dr, Houston, TX",
    image: "https://images.unsplash.com/photo-1510060615691-148d98db8d46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "2:00 PM",
    isOpen: true,
    facilities: ["Weekend School", "Wudu Facilities", "Wheelchair Access"]
  },
  {
    id: "4",
    name: "Masjid Al-Iman",
    type: "Sunni Mosque",
    address: "101 Belief Rd, Atlanta, GA",
    image: "https://images.unsplash.com/photo-1626077422129-7795bdf32dd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:15 PM",
    isOpen: true,
    facilities: ["Women's Section", "Wudu Facilities", "Wheelchair Access"]
  },
  {
    id: "5",
    name: "Downtown Islamic Center",
    type: "Islamic Center",
    address: "202 Central Ave, Austin, TX",
    image: "https://images.unsplash.com/photo-1619982721194-fbdf91caa2a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:45 PM",
    isOpen: false,
    facilities: ["Weekend School", "Parking", "Islamic Library"]
  },
  {
    id: "6",
    name: "Masjid Al-Taqwa",
    type: "Shia Mosque",
    address: "303 Devotion Ln, San Francisco, CA",
    image: "https://images.unsplash.com/photo-1542310503-ff8da10e85a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:00 PM",
    isOpen: true,
    facilities: ["Women's Section", "Funeral Services", "Parking"]
  },
  ...perthMosques
];
