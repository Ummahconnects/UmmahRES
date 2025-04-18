
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumSection from "./components/ForumSection";
import EducationalContent from "./components/EducationalContent";
import { useAuth } from "@/hooks/auth/useAuth";
import { Navigate } from "react-router-dom";
import AuthRequired from "@/components/auth/AuthRequired";

const CommunityPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-muslim-dark mb-6">Muslim Community Hub</h1>
          
          <Tabs defaultValue="forum" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
              <TabsTrigger value="education">Islamic Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forum">
              <ForumSection />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationalContent />
            </TabsContent>
          </Tabs>
        </div>
      </AuthRequired>
    </Layout>
  );
};

export default CommunityPage;
