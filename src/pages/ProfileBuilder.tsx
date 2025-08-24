import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, GraduationCap, Briefcase, Code, Award, Upload, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import EducationForm from "@/components/profile/EducationForm";
import ExperienceForm from "@/components/profile/ExperienceForm";
import ProjectsForm from "@/components/profile/ProjectsForm";
import SkillsForm from "@/components/profile/SkillsForm";
import CertificationsForm from "@/components/profile/CertificationsForm";
import ResumeUpload from "@/components/profile/ResumeUpload";
import ProfilePreview from "@/components/profile/ProfilePreview";
import { useProfile } from "@/hooks/useProfile";
import { UserProfile } from "@/types/profile";

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Code },
  { id: "skills", label: "Skills", icon: Award },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "resume", label: "Resume Upload", icon: Upload },
  { id: "preview", label: "Preview", icon: Eye },
];

export default function ProfileBuilder() {
  const { user } = useAuth();
  const { profile, updateProfile, isLoading } = useProfile();
  const [activeTab, setActiveTab] = useState("personal");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (profile) {
      calculateCompletion();
    }
  }, [profile]);

  const calculateCompletion = () => {
    if (!profile) return;
    
    let completed = 0;
    const sections = 7; // Total sections

    if (profile.personalInfo.fullName && profile.personalInfo.email) completed++;
    if (profile.education.length > 0) completed++;
    if (profile.experience.length > 0) completed++;
    if (profile.projects.length > 0) completed++;
    if (profile.skills.length > 0) completed++;
    if (profile.certifications.length > 0) completed++;
    if (profile.resumeData?.filename) completed++;

    setCompletionPercentage(Math.round((completed / sections) * 100));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getTabIcon = (tabId: string) => {
    const tab = TABS.find(t => t.id === tabId);
    return tab ? tab.icon : User;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Profile Builder</h1>
              <p className="text-muted-foreground">
                Build your professional profile to get personalized recommendations
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              {completionPercentage}% Complete
            </Badge>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Profile Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isCompleted = getCompletionStatus(tab.id, profile);
                    
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className="w-full justify-start gap-3"
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {isCompleted && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {activeTab === "personal" && <PersonalInfoForm />}
                {activeTab === "education" && <EducationForm />}
                {activeTab === "experience" && <ExperienceForm />}
                {activeTab === "projects" && <ProjectsForm />}
                {activeTab === "skills" && <SkillsForm />}
                {activeTab === "certifications" && <CertificationsForm />}
                {activeTab === "resume" && <ResumeUpload />}
                {activeTab === "preview" && <ProfilePreview />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}

function getCompletionStatus(tabId: string, profile: UserProfile | null): boolean {
  if (!profile) return false;
  
  switch (tabId) {
    case "personal":
      return !!(profile.personalInfo.fullName && profile.personalInfo.email);
    case "education":
      return profile.education.length > 0;
    case "experience":
      return profile.experience.length > 0;
    case "projects":
      return profile.projects.length > 0;
    case "skills":
      return profile.skills.length > 0;
    case "certifications":
      return profile.certifications.length > 0;
    case "resume":
      return !!profile.resumeData?.filename;
    case "preview":
      return true; // Always available
    default:
      return false;
  }
}