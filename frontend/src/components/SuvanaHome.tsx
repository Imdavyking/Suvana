import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Twitter, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import heroImage from '@/assets/hero.png';
import suvanaLogo from '@/assets/suvana-logo.png';


const SuvanaHome: React.FC = () => {

  return (
    <div className="min-h-screen bg-background">
        <div className=" p-4 border-2 m-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <img src={suvanaLogo} alt="Suvana Logo" className="w-10 h-10" /> 
          <a
            href="/app"
            className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition-colors duration-200"
          >
            Go to App
          </a>
          </div>
        </div>

      <section className="relative overflow-hidden">
        <div
          className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#4DA2FF] bg-opacity-20"></div>
          <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
            <img
              src={suvanaLogo}
              alt="Suvana Logo"
              className="w-20 h-20 mb-6 animate-logo"
              style={{
                animation: 'logoPopIn 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />
            <h1
              className="text-4xl md:text-6xl font-bold text-white"
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif"
              }}
            >
              SAVING ON SUI
            </h1>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-8">
       
        <div className="flex justify-center">
          <a
            href="/app"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors duration-200"
          >
            Go to App
          </a>
        </div>

  
        <section className="py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Why Choose Suvana?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of traditional Nigerian savings with modern blockchain security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="ajo-card text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Secure & Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built on Sui blockchain for maximum security. All transactions are transparent and immutable.
                </p>
              </CardContent>
            </Card>
            
            <Card className="ajo-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join trusted circles with friends, family, and community members. Build wealth together.
                </p>
              </CardContent>
            </Card>
            
            <Card className="ajo-card text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Guaranteed Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your full payout when it's your turn. No hidden fees, no complex calculations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={suvanaLogo} alt="Suvana Logo" className="w-10 h-10" /> 
              <div>
                <p className="font-semibold text-foreground">Suvana</p>
                <p className="text-xs text-muted-foreground">Empowering Nigeria's Savings Culture</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <Twitter className="w-3 h-3" />
                Suvana_Sui
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuvanaHome;