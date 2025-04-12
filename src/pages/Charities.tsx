
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharityCard, { CharityInfo } from "@/components/charities/CharityCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Sample data for charities
const sampleCharities: CharityInfo[] = [
  {
    id: "1",
    name: "Local Mosque Renovation Fund",
    description: "Help renovate our local mosque to create a better environment for our community gatherings and prayers.",
    imageUrl: "/placeholder.svg",
    isLocal: true,
    location: "Perth, WA",
    goalAmount: 50000,
    currentAmount: 32500,
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    category: "Mosque"
  },
  {
    id: "2",
    name: "Community Food Bank Drive",
    description: "Support our local food bank to provide meals for families in need during difficult times.",
    imageUrl: "/placeholder.svg",
    isLocal: true,
    location: "Sydney, NSW",
    goalAmount: 10000,
    currentAmount: 6800,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    category: "Food"
  },
  {
    id: "3",
    name: "Islamic Education Scholarship",
    description: "Help fund scholarships for underprivileged students seeking Islamic education.",
    imageUrl: "/placeholder.svg",
    isLocal: false,
    location: "Nationwide",
    goalAmount: 100000,
    currentAmount: 78500,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    category: "Education"
  },
  {
    id: "4",
    name: "Emergency Relief for Gaza",
    description: "Provide urgent humanitarian aid including food, medicine, and shelter for families affected by the conflict.",
    imageUrl: "/placeholder.svg",
    isLocal: false,
    location: "International",
    goalAmount: 500000,
    currentAmount: 320000,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    category: "Relief"
  },
  {
    id: "5",
    name: "Youth Sports Program",
    description: "Fund sports equipment and activities for Muslim youth in our community to promote health and social skills.",
    imageUrl: "/placeholder.svg", 
    isLocal: true,
    location: "Brisbane, QLD",
    goalAmount: 15000,
    currentAmount: 9200,
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    category: "Youth"
  },
  {
    id: "6",
    name: "Ramadan Iftar Program",
    description: "Help provide iftar meals for the community during Ramadan, ensuring no one breaks their fast alone.",
    imageUrl: "/placeholder.svg",
    isLocal: true,
    location: "Melbourne, VIC",
    goalAmount: 25000,
    currentAmount: 18600,
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    category: "Food"
  }
];

const CharitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter charities based on search term and active tab
  const filteredCharities = sampleCharities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         charity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charity.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "local") return matchesSearch && charity.isLocal;
    if (activeTab === "global") return matchesSearch && !charity.isLocal;
    
    return matchesSearch;
  });
  
  // Sort charities to show local ones first in the "all" tab
  const sortedCharities = [...filteredCharities].sort((a, b) => {
    if (activeTab === "all") {
      if (a.isLocal && !b.isLocal) return -1;
      if (!a.isLocal && b.isLocal) return 1;
    }
    
    // Secondary sort by end date (soonest ending first)
    return a.endDate.getTime() - b.endDate.getTime();
  });
  
  // Get featured charity (first local one with highest percentage of goal)
  const featuredCharity = sampleCharities
    .filter(c => c.isLocal)
    .sort((a, b) => (b.currentAmount / b.goalAmount) - (a.currentAmount / a.goalAmount))[0];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Our Ummah</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help make a difference in our community through transparent and ethical donations to these worthy causes.
          </p>
        </div>
        
        {/* Featured Charity */}
        {featuredCharity && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Local Campaign</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={featuredCharity.imageUrl || "/placeholder.svg"} 
                    alt={featuredCharity.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="uppercase tracking-wide text-sm text-muslim-teal font-semibold">
                    {featuredCharity.location} • {featuredCharity.category}
                  </div>
                  <h2 className="mt-2 text-xl font-bold">{featuredCharity.name}</h2>
                  <p className="mt-2 text-gray-600">{featuredCharity.description}</p>
                  
                  <div className="mt-4 md:flex gap-4">
                    <div className="md:w-2/3 mb-4 md:mb-0">
                      <DonationTimer 
                        endDate={featuredCharity.endDate} 
                        goalAmount={featuredCharity.goalAmount} 
                        currentAmount={featuredCharity.currentAmount} 
                      />
                    </div>
                    <div className="md:w-1/3 flex items-end">
                      <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90 py-6">
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search charities by name or location"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="local">Local</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Charity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCharities.map((charity) => (
            <CharityCard 
              key={charity.id} 
              charity={charity} 
              featured={charity.id === featuredCharity?.id}
            />
          ))}
          
          {sortedCharities.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">No matching charities found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Import the DonationTimer component here to avoid circular dependency
const DonationTimer = ({ endDate, goalAmount, currentAmount }: {
  endDate: Date;
  goalAmount: number;
  currentAmount: number;
}) => {
  // Calculate days remaining
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-muslim-teal">${currentAmount.toLocaleString()}</span>
          <span className="text-gray-600 text-sm"> raised of ${goalAmount.toLocaleString()}</span>
        </div>
        <div className="text-sm bg-gray-100 px-2 py-1 rounded">
          {diffDays > 0 ? `${diffDays} days left` : "Ended"}
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2 bg-gray-100" />
    </div>
  );
};

// Import the Progress component to avoid errors
import { Progress } from "@/components/ui/progress";

export default CharitiesPage;
