import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

interface AnalysisProgressProps {
  jobRole: string;
}

export default function AnalysisProgress({ jobRole }: AnalysisProgressProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse text-primary" />
            <span className="font-medium">AI Analysis in Progress for {jobRole}</span>
          </div>
          <Progress value={66} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Parsing content, analyzing skills against job requirements, and generating insights...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}