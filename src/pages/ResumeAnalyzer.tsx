import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  Target,
  TrendingUp,
  Star
} from "lucide-react";
import Container from "@/components/ui/Container";
import { useToast } from "@/hooks/use-toast";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.docx'))) {
      setFile(selectedFile);
      setAnalysisResult(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive"
      });
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResult({
        score: 85,
        strengths: [
          "Strong technical skills in React and TypeScript",
          "Good project portfolio with diverse applications",
          "Clear and well-structured layout",
          "Relevant work experience in software development"
        ],
        weaknesses: [
          "Missing quantifiable achievements",
          "Could benefit from more leadership examples",
          "Lacks certifications in current technologies",
          "No mention of soft skills"
        ],
        skillGaps: [
          "System Design",
          "Cloud Architecture (AWS/Azure)",
          "DevOps practices",
          "Agile methodologies"
        ],
        recommendations: [
          "Add specific metrics to your achievements (e.g., 'Improved performance by 40%')",
          "Include relevant certifications or online courses",
          "Highlight leadership and teamwork experiences",
          "Add a skills section with proficiency levels"
        ],
        atsScore: 78,
        keywords: ["React", "TypeScript", "JavaScript", "Node.js", "MongoDB", "Git"],
        missingKeywords: ["Docker", "Kubernetes", "CI/CD", "Testing", "Agile"]
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!"
      });
    }, 3000);
  };

  return (
    <Container className="py-8 mt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered insights about your resume. Discover strengths, identify gaps, 
            and receive personalized recommendations to improve your job prospects.
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <Input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PDF and DOCX formats
                </p>
              </div>
            </div>
            
            {file && (
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">{file.name}</span>
                  <Badge variant="secondary">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
                <Button 
                  onClick={analyzeResume} 
                  disabled={isAnalyzing}
                  className="ml-4"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 animate-pulse text-primary" />
                  <span className="font-medium">AI Analysis in Progress</span>
                </div>
                <Progress value={66} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Parsing content, analyzing skills, and generating insights...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {analysisResult.score}/100
                    </div>
                    <Progress value={analysisResult.score} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {analysisResult.score >= 80 ? "Excellent" : 
                       analysisResult.score >= 60 ? "Good" : "Needs Improvement"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    ATS Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-blue-600">
                      {analysisResult.atsScore}/100
                    </div>
                    <Progress value={analysisResult.atsScore} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {analysisResult.atsScore >= 80 ? "ATS Friendly" : "Needs Optimization"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skill Gaps */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps to Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.skillGaps.map((skill: string, index: number) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Found Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Missing Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="text-center">
              <Button size="lg" className="w-full md:w-auto">
                Update My Profile with Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}