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
        <div className="p-3 sm:p-4 border-2 m-2 sm:m-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <img src={suvanaLogo} alt="Suvana Logo" className="w-8 h-8 sm:w-10 sm:h-10" /> 
          <a
            href="/app"
            className="inline-block px-4 sm:px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition-colors duration-200 text-sm sm:text-base"
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
              className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 animate-logo"
              style={{
                animation: 'logoPopIn 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />
            <h1
              className="text-2xl sm:text-4xl md:text-6xl font-bold text-white px-4"
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif"
              }}
            >
              SAVING ON SUI
            </h1>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
       
        <div className="flex justify-center">
          <a
            href="/app"
            className="inline-block px-6 sm:px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors duration-200 text-sm sm:text-base"
          >
            Go to App
          </a>
        </div>

  
        <section className="py-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Why Choose Suvana?</h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Experience the power of traditional Nigerian savings with modern blockchain security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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

      <footer className="border-t border-border bg-muted/30 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={suvanaLogo} alt="Suvana Logo" className="w-8 h-8 sm:w-10 sm:h-10" /> 
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Suvana</p>
                <p className="text-xs text-muted-foreground">Empowering Nigeria's Savings Culture</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2 text-xs sm:text-sm">
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