import { useState } from "react";
import Container from "@/components/ui/Container";
import { useToast } from "@/hooks/use-toast";
import JobRoleStep from "@/components/resume/JobRoleStep";
import ResumeUploadStep from "@/components/resume/ResumeUploadStep";
import AnalysisProgress from "@/components/resume/AnalysisProgress";
import AnalysisResults from "@/components/resume/AnalysisResults";
import ProgressSteps from "@/components/resume/ProgressSteps";

export default function ResumeAnalyzer() {
  const [step, setStep] = useState<'job-role' | 'upload' | 'analysis'>('job-role');
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleNext = () => {
    setStep('upload');
  };

  const handleBack = () => {
    setStep('job-role');
  };

  const handleFileUpload = (selectedFile: File | null) => {
    setFile(selectedFile);
    setAnalysisResult(null);
  };

  const analyzeResume = async () => {
    if (!file || !jobRole) return;

    setIsAnalyzing(true);
    setStep('analysis');
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_role', jobRole);
      formData.append('job_description', jobDescription);

      // TODO: Replace with actual API call to Python backend
      // For now, simulate analysis process
      setTimeout(() => {
        setAnalysisResult({
          score: 85,
          jobMatchScore: 78,
          strengths: [
            `Strong technical skills relevant to ${jobRole}`,
            "Good project portfolio with diverse applications",
            "Clear and well-structured layout",
            "Relevant work experience in software development"
          ],
          weaknesses: [
            "Missing quantifiable achievements",
            "Could benefit from more leadership examples",
            "Lacks certifications in current technologies",
            "No mention of soft skills required for the role"
          ],
          skillGaps: [
            "System Design",
            "Cloud Architecture (AWS/Azure)",
            "DevOps practices",
            "Agile methodologies"
          ],
          recommendations: [
            `Add specific metrics to your achievements for ${jobRole} positions`,
            "Include relevant certifications or online courses",
            "Highlight leadership and teamwork experiences",
            "Add a skills section with proficiency levels",
            `Tailor your summary to match ${jobRole} requirements`
          ],
          atsScore: 78,
          keywords: ["React", "TypeScript", "JavaScript", "Node.js", "MongoDB", "Git"],
          missingKeywords: ["Docker", "Kubernetes", "CI/CD", "Testing", "Agile"],
          jobRole: jobRole,
          parsedContent: "Sample parsed resume content..."
        });
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Complete",
          description: `Your resume has been analyzed for ${jobRole} positions!`
        });
      }, 3000);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const startOver = () => {
    setStep('job-role');
    setJobRole("");
    setJobDescription("");
    setFile(null);
    setAnalysisResult(null);
  };

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Update",
      description: "This feature will be implemented to update your profile with the analysis results."
    });
  };

  return (
    <Container className="py-8 mt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered insights about your resume tailored to specific job roles. 
            Discover strengths, identify gaps, and receive personalized recommendations.
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={step} />

        {/* Steps */}
        {step === 'job-role' && (
          <JobRoleStep
            jobRole={jobRole}
            jobDescription={jobDescription}
            onJobRoleChange={setJobRole}
            onJobDescriptionChange={setJobDescription}
            onNext={handleNext}
          />
        )}

        {step === 'upload' && (
          <ResumeUploadStep
            jobRole={jobRole}
            file={file}
            onFileUpload={handleFileUpload}
            onAnalyze={analyzeResume}
            onBack={handleBack}
          />
        )}

        {step === 'analysis' && isAnalyzing && (
          <AnalysisProgress jobRole={jobRole} />
        )}

        {step === 'analysis' && analysisResult && !isAnalyzing && file && (
          <AnalysisResults
            file={file}
            analysisResult={analysisResult}
            onStartOver={startOver}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </div>
    </Container>
  );
}