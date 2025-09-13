import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const TryOn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<any>(null);
  const [productUrl, setProductUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const storedImage = localStorage.getItem('virtualFitUserImage');
    const storedMeasurements = localStorage.getItem('virtualFitMeasurements');
    
    if (!storedImage || !storedMeasurements) {
      toast({
        title: "Missing data",
        description: "Please complete measurements and upload your photo first",
        variant: "destructive",
      });
      navigate("/measurements");
      return;
    }
    
    setUserImage(storedImage);
    setMeasurements(JSON.parse(storedMeasurements));
  }, [navigate, toast]);

  const handleTryOn = () => {
    if (!productUrl.trim()) {
      toast({
        title: "Product URL required",
        description: "Please enter a product URL or upload an image",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store the try-on result
      const tryOnResult = {
        userImage,
        productUrl,
        measurements,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('virtualFitTryOnResult', JSON.stringify(tryOnResult));
      
      toast({
        title: "Try-on complete!",
        description: "Your virtual try-on has been processed successfully",
      });
      
      navigate("/fit-analysis");
    }, 3000);
  };

  const sampleProducts = [
    {
      name: "Classic White T-Shirt",
      url: "https://example.com/white-tshirt",
      image: "👕"
    },
    {
      name: "Blue Denim Jacket",
      url: "https://example.com/denim-jacket", 
      image: "🧥"
    },
    {
      name: "Black Dress",
      url: "https://example.com/black-dress",
      image: "👗"
    },
  ];

  if (!userImage || !measurements) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Virtual Try-On</h1>
            <p className="text-white/80">Select a product to see how it looks on you</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Image Section */}
            <Card className="fashion-card">
              <CardHeader>
                <CardTitle className="text-center">Your Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img 
                    src={userImage} 
                    alt="User" 
                    className="mx-auto max-h-96 rounded-lg shadow-lg"
                  />
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Height: {measurements.height} cm</p>
                    <p>Chest: {measurements.chest} cm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Selection Section */}
            <Card className="fashion-card">
              <CardHeader>
                <CardTitle>Select Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product URL Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Product URL (Amazon, etc.)
                  </label>
                  <Input
                    placeholder="Paste product URL here..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                </div>

                {/* Sample Products */}
                <div className="space-y-3">
                  <h4 className="font-medium">Or try these samples:</h4>
                  <div className="space-y-2">
                    {sampleProducts.map((product, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setProductUrl(product.url)}
                      >
                        <span className="mr-3 text-xl">{product.image}</span>
                        {product.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Try-On Button */}
                <Button
                  onClick={handleTryOn}
                  variant="fashion"
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "Processing Virtual Try-On..." : "Start Virtual Try-On"}
                </Button>

                {isProcessing && (
                  <div className="text-center space-y-2">
                    <div className="animate-pulse-slow text-2xl">🤖</div>
                    <p className="text-sm text-muted-foreground">
                      AI is overlaying the garment on your photo...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/upload")}
            >
              Back to Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;