import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResumePreview from "@/components/profile/ResumePreview";

interface ResumeUploadStepProps {
  jobRole: string;
  file: File | null;
  onFileUpload: (file: File | null) => void;
  onAnalyze: () => void;
  onBack: () => void;
}

export default function ResumeUploadStep({ 
  jobRole, 
  file, 
  onFileUpload, 
  onAnalyze, 
  onBack 
}: ResumeUploadStepProps) {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.docx'))) {
      onFileUpload(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Your Resume
          <Badge variant="secondary" className="ml-2">
            For {jobRole}
          </Badge>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">{file.name}</span>
                <Badge variant="secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </div>
            </div>

            <ResumePreview file={file} fullView={true} />

            <div className="flex gap-2">
              <Button onClick={onAnalyze} className="flex-1">
                <Brain className="h-4 w-4 mr-2" />
                Analyze for {jobRole}
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}