import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Download, Maximize2, Minimize2 } from "lucide-react";

interface ResumePreviewProps {
  file: File;
  showAnalysis?: boolean;
}

export default function ResumePreview({ file, showAnalysis = false }: ResumePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    if (file) {
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Simulate text extraction for demo
      setExtractedText(`
JOHN DOE
Software Engineer
Email: john.doe@example.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

SUMMARY
Experienced Software Engineer with 5+ years in full-stack development...

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3
• Backend: Node.js, Python, Express.js
• Databases: MongoDB, PostgreSQL, MySQL
• Tools: Git, Docker, AWS, Jenkins

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Developed and maintained 10+ web applications using React and Node.js
• Improved application performance by 40% through code optimization
• Led a team of 3 junior developers on multiple projects

Software Engineer | StartupXYZ | 2019 - 2021
• Built responsive web applications using modern frameworks
• Collaborated with cross-functional teams to deliver features on time
• Implemented automated testing reducing bugs by 30%

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

PROJECTS
E-Commerce Platform
• Built full-stack e-commerce solution with React and Node.js
• Integrated payment processing and inventory management
• Deployed on AWS with 99.9% uptime

Task Management App
• Developed React Native mobile application
• Implemented real-time synchronization using WebSockets
• Published on App Store with 4.8/5 rating
      `);

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = file.name;
    link.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Resume Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {file.type === 'application/pdf' ? 'PDF' : 'DOCX'}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${isExpanded ? 'min-h-[600px]' : 'min-h-[300px]'}`}>
          {/* File Info */}
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Preview Content */}
          <div className="border rounded-lg overflow-hidden">
            {file.type === 'application/pdf' ? (
              <div className="bg-gray-50 dark:bg-gray-900 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-sm p-6 min-h-[250px]">
                  <div className="text-center mb-4">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">PDF Preview</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Full PDF preview available after analysis
                    </p>
                  </div>
                  
                  {/* Show extracted text in a readable format */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <h4 className="font-semibold mb-2">Extracted Content Preview:</h4>
                      <pre className="whitespace-pre-wrap text-xs text-muted-foreground overflow-hidden max-h-32">
                        {extractedText.substring(0, 300)}...
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-sm p-6 min-h-[250px]">
                  <div className="text-center mb-4">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">DOCX Preview</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Document content will be processed for analysis
                    </p>
                  </div>
                  
                  {/* Show extracted text in a readable format */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <h4 className="font-semibold mb-2">Extracted Content Preview:</h4>
                      <pre className="whitespace-pre-wrap text-xs text-muted-foreground overflow-hidden max-h-32">
                        {extractedText.substring(0, 300)}...
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Highlights */}
          {showAnalysis && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Quick Analysis</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-lg font-bold text-green-600">8</div>
                  <div className="text-xs text-muted-foreground">Sections Found</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <div className="text-xs text-muted-foreground">Skills Detected</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-lg font-bold text-purple-600">850</div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-lg font-bold text-orange-600">2</div>
                  <div className="text-xs text-muted-foreground">Pages</div>
                </div>
              </div>
            </div>
          )}

          {isExpanded && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Full Content Preview</h4>
              <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50 dark:bg-gray-900">
                <pre className="whitespace-pre-wrap text-xs text-muted-foreground">
                  {extractedText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}