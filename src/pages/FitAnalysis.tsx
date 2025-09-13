import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface FitAnalysis {
  overall: "perfect" | "good" | "loose" | "tight";
  chest: "perfect" | "loose" | "tight";
  waist: "perfect" | "loose" | "tight";
  length: "perfect" | "long" | "short";
  confidence: number;
  recommendations: string[];
}

const FitAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tryOnResult, setTryOnResult] = useState<any>(null);
  const [fitAnalysis, setFitAnalysis] = useState<FitAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem('virtualFitTryOnResult');
    
    if (!storedResult) {
      toast({
        title: "No try-on data found",
        description: "Please complete the virtual try-on first",
        variant: "destructive",
      });
      navigate("/try-on");
      return;
    }
    
    const result = JSON.parse(storedResult);
    setTryOnResult(result);

    // Simulate AI fit analysis
    setTimeout(() => {
      const analysis: FitAnalysis = {
        overall: "good",
        chest: "perfect",
        waist: "tight",
        length: "perfect",
        confidence: 87,
        recommendations: [
          "Consider sizing up for a more comfortable fit around the waist",
          "The chest area fits perfectly according to your measurements",
          "Length is ideal for your height",
          "This style complements your body proportions well"
        ]
      };
      
      setFitAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  }, [navigate, toast]);

  const getFitColor = (fit: string) => {
    switch (fit) {
      case "perfect": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "loose": return "bg-yellow-500";
      case "tight": return "bg-orange-500";
      case "long": return "bg-purple-500";
      case "short": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getFitText = (fit: string) => {
    return fit.charAt(0).toUpperCase() + fit.slice(1);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-20 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <Card className="fashion-card">
              <CardContent className="p-12">
                <div className="animate-pulse-slow text-6xl mb-6">🤖</div>
                <h2 className="text-2xl font-bold mb-4">Analyzing Fit...</h2>
                <p className="text-muted-foreground">
                  Our AI is analyzing how the garment fits your body measurements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!tryOnResult || !fitAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Fit Analysis Results</h1>
            <p className="text-white/80">Here's how the garment fits your body</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Try-On Result */}
            <Card className="fashion-card">
              <CardHeader>
                <CardTitle className="text-center">Virtual Try-On Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative">
                    <img 
                      src={tryOnResult.userImage} 
                      alt="Try-on result" 
                      className="mx-auto max-h-96 rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-fashion-primary/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                        Garment Applied
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    className={`${getFitColor(fitAnalysis.overall)} text-white`}
                  >
                    Overall Fit: {getFitText(fitAnalysis.overall)}
                  </Badge>
                  
                  <div className="text-sm text-muted-foreground">
                    Confidence: {fitAnalysis.confidence}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card className="fashion-card">
              <CardHeader>
                <CardTitle>Detailed Fit Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fit Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium">Fit by Area:</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Chest:</span>
                      <Badge className={`${getFitColor(fitAnalysis.chest)} text-white`}>
                        {getFitText(fitAnalysis.chest)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Waist:</span>
                      <Badge className={`${getFitColor(fitAnalysis.waist)} text-white`}>
                        {getFitText(fitAnalysis.waist)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Length:</span>
                      <Badge className={`${getFitColor(fitAnalysis.length)} text-white`}>
                        {getFitText(fitAnalysis.length)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-medium">AI Recommendations:</h4>
                  <ul className="space-y-2">
                    {fitAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button variant="fashion" className="w-full">
                    🛒 Purchase This Item
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => navigate("/try-on")}>
                      Try Another Item
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/")}>
                      Start Over
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitAnalysis;