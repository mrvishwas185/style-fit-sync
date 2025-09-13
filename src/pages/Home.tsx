import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Home = () => {
  const features = [
    {
      title: "Precise Measurements",
      description: "Get accurate body measurements for perfect fit predictions",
      icon: "📏",
    },
    {
      title: "AI-Powered Try-On",
      description: "See how clothes look on you with advanced AI overlay technology",
      icon: "🤖",
    },
    {
      title: "Smart Fit Analysis",
      description: "Receive personalized fit recommendations based on your measurements",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6 animate-float">
              Virtual Try-On
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Experience the future of online shopping with AI-powered virtual try-on technology.
              Upload your photo, enter measurements, and see how clothes fit before you buy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/measurements">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Start Your Journey
                </Button>
              </Link>
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="fashion-card">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="container mx-auto text-center">
          <Card className="fashion-card max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-card-foreground">
                Ready to Transform Your Shopping?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who have revolutionized their online shopping experience
              </p>
              <Link to="/measurements">
                <Button variant="fashion" size="lg">
                  Get Started Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;