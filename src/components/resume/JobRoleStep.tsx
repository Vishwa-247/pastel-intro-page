import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobRoleStepProps {
  jobRole: string;
  jobDescription: string;
  onJobRoleChange: (value: string) => void;
  onJobDescriptionChange: (value: string) => void;
  onNext: () => void;
}

export default function JobRoleStep({ 
  jobRole, 
  jobDescription, 
  onJobRoleChange, 
  onJobDescriptionChange, 
  onNext 
}: JobRoleStepProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!jobRole.trim()) {
      toast({
        title: "Job role required",
        description: "Please enter the job role you're applying for.",
        variant: "destructive"
      });
      return;
    }
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Role Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobRole">Job Role/Position *</Label>
          <Input
            id="jobRole"
            placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
            value={jobRole}
            onChange={(e) => onJobRoleChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description (Optional)</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here for more accurate analysis..."
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows={6}
          />
          <p className="text-sm text-muted-foreground">
            Adding a job description will help provide more targeted recommendations
          </p>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Continue to Upload
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}