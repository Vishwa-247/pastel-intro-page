import { ArrowRight } from "lucide-react";

interface ProgressStepsProps {
  currentStep: 'job-role' | 'upload' | 'analysis';
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const getStepStatus = (step: string) => {
    const stepOrder = ['job-role', 'upload', 'analysis'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'inactive';
  };

  const getStepClasses = (step: string) => {
    const status = getStepStatus(step);
    
    if (status === 'completed') {
      return 'text-green-600';
    } else if (status === 'active') {
      return 'text-primary';
    } else {
      return 'text-muted-foreground';
    }
  };

  const getCircleClasses = (step: string) => {
    const status = getStepStatus(step);
    
    if (status === 'completed') {
      return 'bg-green-600 text-white';
    } else if (status === 'active') {
      return 'bg-primary text-white';
    } else {
      return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 text-sm">
      <div className={`flex items-center gap-2 ${getStepClasses('job-role')}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCircleClasses('job-role')}`}>
          1
        </div>
        Job Role
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 ${getStepClasses('upload')}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCircleClasses('upload')}`}>
          2
        </div>
        Upload Resume
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 ${getStepClasses('analysis')}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCircleClasses('analysis')}`}>
          3
        </div>
        Analysis
      </div>
    </div>
  );
}