import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Briefcase, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";
import ResumePreview from "@/components/profile/ResumePreview";

interface AnalysisResultsProps {
  file: File;
  analysisResult: any;
  onStartOver: () => void;
  onUpdateProfile: () => void;
}

export default function AnalysisResults({ 
  file, 
  analysisResult, 
  onStartOver, 
  onUpdateProfile 
}: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <Briefcase className="h-5 w-5 text-green-500" />
              Job Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-green-600">
                {analysisResult.jobMatchScore}/100
              </div>
              <Progress value={analysisResult.jobMatchScore} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Match for {analysisResult.jobRole}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              ATS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">
                {analysisResult.atsScore}/100
              </div>
              <Progress value={analysisResult.atsScore} className="h-3" />
              <p className="text-sm text-muted-foreground">
                ATS Friendly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Preview with Analysis */}
      <ResumePreview file={file} showAnalysis={true} fullView={true} />

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
          <CardTitle>Skill Gaps for {analysisResult.jobRole}</CardTitle>
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
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysisResult.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={onStartOver} variant="outline">
          Analyze Another Resume
        </Button>
        <Button onClick={onUpdateProfile}>
          Update Profile with Analysis
        </Button>
      </div>
    </div>
  );
}