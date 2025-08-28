import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/Container";
import { Progress } from "@/components/ui/progress";
import { companies } from "@/data/companyProblems";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InlineFeedback from "@/components/course/InlineFeedback";

const CompanyProblems = () => {
  const { companyId } = useParams();
  const company = companies.find(c => c.id === companyId);
  
  const [completedProblems, setCompletedProblems] = useState(new Set<string>());
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  const toggleProblem = useCallback((problemName: string) => {
    const isCurrentlyCompleted = completedProblems.has(problemName);

    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemName)) {
        newSet.delete(problemName);
      } else {
        newSet.add(problemName);
      }
      return newSet;
    });

    // Show feedback form when marking as completed (not when unchecking)
    if (!isCurrentlyCompleted) {
      setExpandedFeedback(problemName);
    }
  }, [completedProblems]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">Company not found</h2>
            <Link to="/dsa-sheet">
              <Button>Back to DSA Sheet</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = (completedProblems.size / company.totalProblems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Container className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb with Back Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Link to="/dsa-sheet" className="hover:text-primary transition-colors">
                DSA Sheet
              </Link>
              <span>/</span>
              <span>Companies</span>
              <span>/</span>
              <span className="text-foreground">{company.title}</span>
            </div>
            <Link to="/dsa-sheet">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-6xl">{company.icon}</div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {company.title} Problems
                </h1>
                <p className="text-xl text-muted-foreground">
                  {completedProblems.size}/{company.totalProblems} problems solved
                </p>
                {company.links && company.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {company.links.map(link => (
                      <Button key={link.url} asChild variant="secondary" size="sm" className="gap-2">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <div className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(1)}% completed
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {company.problems.map((problem, index) => {
              const isCompleted = completedProblems.has(problem.name);
              
              return (
                <Card 
                  key={problem.name} 
                  className={`group transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : 'hover:shadow-md border-border'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => toggleProblem(problem.name)}
                          className="flex-shrink-0"
                        />
                        
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs font-mono">
                              {String(index + 1).padStart(2, '0')}
                            </Badge>
                            <h3 className={`font-semibold text-lg ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {problem.name}
                            </h3>
                            <Badge 
                              variant={
                                problem.difficulty === 'Easy' ? 'default' : 
                                problem.difficulty === 'Medium' ? 'secondary' : 
                                'destructive'
                              }
                              className="text-xs"
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <a 
                            href={problem.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Solve
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Inline Feedback */}
                  {isCompleted && (
                    <div className="mt-4 px-6 pb-6">
                      <InlineFeedback
                        isExpanded={expandedFeedback === problem.name}
                        onToggle={() => setExpandedFeedback(expandedFeedback === problem.name ? null : problem.name)}
                        problemName={problem.name}
                        difficulty={problem.difficulty}
                        company={company.title}
                        onSubmit={() => setExpandedFeedback(null)}
                      />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link to="/dsa-sheet">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to DSA Sheet
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompanyProblems;
