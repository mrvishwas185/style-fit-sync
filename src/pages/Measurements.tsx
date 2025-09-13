import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Measurements {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
}

const Measurements = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<Measurements>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
  });

  const handleInputChange = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all fields are filled
    const hasEmptyFields = Object.values(measurements).some(value => !value.trim());
    
    if (hasEmptyFields) {
      toast({
        title: "Missing Information",
        description: "Please fill in all measurement fields",
        variant: "destructive",
      });
      return;
    }

    // Store measurements in localStorage
    localStorage.setItem('virtualFitMeasurements', JSON.stringify(measurements));
    
    toast({
      title: "Measurements Saved!",
      description: "Your measurements have been stored successfully",
    });

    // Navigate to upload page
    navigate("/upload");
  };

  const measurementFields = [
    { key: "height" as keyof Measurements, label: "Height", placeholder: "e.g., 170 cm", unit: "cm" },
    { key: "weight" as keyof Measurements, label: "Weight", placeholder: "e.g., 65 kg", unit: "kg" },
    { key: "chest" as keyof Measurements, label: "Chest", placeholder: "e.g., 90 cm", unit: "cm" },
    { key: "waist" as keyof Measurements, label: "Waist", placeholder: "e.g., 75 cm", unit: "cm" },
    { key: "hips" as keyof Measurements, label: "Hips", placeholder: "e.g., 95 cm", unit: "cm" },
    { key: "shoulders" as keyof Measurements, label: "Shoulders", placeholder: "e.g., 40 cm", unit: "cm" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="fashion-card">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-card-foreground mb-2">
                Your Measurements
              </CardTitle>
              <p className="text-muted-foreground">
                Enter your body measurements for accurate fit predictions
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {measurementFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key} className="text-sm font-medium">
                        {field.label} ({field.unit})
                      </Label>
                      <Input
                        id={field.key}
                        type="number"
                        placeholder={field.placeholder}
                        value={measurements[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="flex-1"
                  >
                    Back to Home
                  </Button>
                  <Button
                    type="submit"
                    variant="fashion"
                    className="flex-1"
                  >
                    Save & Continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Measurements;