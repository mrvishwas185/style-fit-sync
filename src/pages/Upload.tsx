import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Store image in localStorage (in real app, this would be uploaded to server)
    localStorage.setItem('virtualFitUserImage', selectedImage);
    
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Image uploaded successfully!",
        description: "Your image has been processed and is ready for try-on",
      });
      navigate("/try-on");
    }, 2000);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="fashion-card">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-card-foreground mb-2">
                Upload Your Photo
              </CardTitle>
              <p className="text-muted-foreground">
                Upload a full-body photo for the best virtual try-on experience
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div 
                  onClick={triggerFileSelect}
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected" 
                        className="mx-auto max-h-64 rounded-lg shadow-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📸</div>
                      <div>
                        <p className="text-lg font-medium mb-2">Choose your photo</p>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop or click to upload<br />
                          JPG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Tips */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">📝 Tips for best results:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use a full-body photo standing straight</li>
                      <li>• Ensure good lighting and clear image quality</li>
                      <li>• Wear form-fitting clothes for better outline detection</li>
                      <li>• Stand against a plain background if possible</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/measurements")}
                    className="flex-1"
                  >
                    Back to Measurements
                  </Button>
                  <Button
                    onClick={handleUpload}
                    variant="fashion"
                    disabled={!selectedImage || isUploading}
                    className="flex-1"
                  >
                    {isUploading ? "Processing..." : "Continue to Try-On"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;