import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, ProfileFormData } from "@/types/profile";
import { profileService } from "@/api/services/profileService";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize empty profile
  const initializeProfile = (): UserProfile => ({
    userId: user?.id || "",
    personalInfo: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    completionPercentage: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // For now, use local storage as demo backend
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // Initialize new profile
        const newProfile = initializeProfile();
        setProfile(newProfile);
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(newProfile));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      setError("Failed to load profile");
      // Initialize fallback profile
      setProfile(initializeProfile());
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileFormData>) => {
    if (!profile || !user) return;

    setIsLoading(true);
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // Save to local storage for demo
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      
      // TODO: Replace with actual API call
      // await profileService.updateProfile(user.id, updates);
      
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResume = async (file: File) => {
    if (!profile || !user) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual resume upload and parsing
      // For demo, simulate the upload
      const resumeData = {
        filename: file.name,
        uploadDate: new Date().toISOString(),
        parsedData: {
          // Mock parsed data
          extractedText: "Sample resume content...",
        },
        aiAnalysis: "This is a well-structured resume with relevant experience in software development.",
        skillGaps: ["Advanced React", "System Design", "Cloud Architecture"],
        recommendations: [
          "Consider adding more quantifiable achievements",
          "Include relevant certifications",
          "Highlight leadership experience"
        ],
      };

      const updatedProfile: UserProfile = {
        ...profile,
        resumeData,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);

      toast({
        title: "Success",
        description: "Resume uploaded and analyzed successfully",
      });

    } catch (error) {
      console.error("Failed to upload resume:", error);
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadResume,
    loadProfile,
  };
};