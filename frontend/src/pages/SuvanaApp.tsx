import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';
import CreatePoolModal from '@/components/CreatePoolModal';
import PoolCard from '@/components/PoolCard';
import UserDashboard from '@/components/UserDashboard';
import { samplePools, userSamplePool } from '@/data/samplePools';
import { useToast } from '@/hooks/use-toast';
import { Plus, Users, TrendingUp, Shield, Zap, ArrowLeft } from 'lucide-react';
import suvanaLogo from '@/assets/suvana-logo.png';

const SuvanaApp: React.FC = () => {
  const currentWallet = useCurrentWallet();
  const [availablePools, setAvailablePools] = useState(samplePools);
  const [userPool, setUserPool] = useState<any>(null);
  const [showAllPools, setShowAllPools] = useState(false);
  const { toast } = useToast();

  const isWalletConnected = currentWallet?.isConnected || false;
  const walletAddress = currentWallet?.currentWallet?.accounts?.[0]?.address || '';

  // Set user pool when wallet connects
  React.useEffect(() => {
    if (isWalletConnected && !userPool) {
      setUserPool(userSamplePool);
    } else if (!isWalletConnected) {
      setUserPool(null);
    }
  }, [isWalletConnected, userPool]);

  const handlePoolCreated = (newPool: any) => {
    setAvailablePools(prev => [newPool, ...prev]);
    setUserPool(newPool);
  };

  const handleJoinPool = (poolId: string) => {
    const pool = availablePools.find(p => p.id === poolId);
    if (pool) {
      const updatedPool = {
        ...pool,
        participants: pool.participants + 1,
        collected: pool.collected + pool.shareAmount,
      };
      
      setAvailablePools(prev => 
        prev.map(p => p.id === poolId ? updatedPool : p)
      );
      setUserPool(updatedPool);
      
      toast({
        title: "Successfully Joined Pool! 🎉",
        description: `Welcome to ${pool.name}. Your first contribution is due soon.`,
      });
    }
  };

  const handleContribute = (poolId: string) => {
    toast({
      title: "Contribution Sent! ✨",
      description: "Your Ajo share has been successfully contributed to the pool.",
    });
  };

  const displayedPools = showAllPools ? availablePools : availablePools.slice(0, 3);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center mb-8">
            <img src={suvanaLogo} alt="Suvana Logo" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Suvana</h1>
            <p className="text-muted-foreground">Connect your Sui wallet to start managing your Ajo pools</p>
          </div>
          
          <Card className="ajo-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure Wallet Connection</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your Sui wallet to access your Ajo pools and manage your savings
                  </p>
                </div>
                <ConnectButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </a>
              <div className="w-px h-6 bg-border" />
              <img src={suvanaLogo} alt="Suvana Logo" className="w-8 h-8" />
              <span className="font-semibold text-lg">Suvana App</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Ajo Dashboard</h1>
          <p className="text-muted-foreground">Manage your savings pools and track your contributions</p>
        </div>

        {/* User Dashboard */}
        {userPool && (
          <section>
            <h2 className="text-2xl font-bold mb-6">My Active Pool</h2>
            <UserDashboard 
              userPool={userPool} 
              onContribute={handleContribute}
              walletAddress={walletAddress}
            />
          </section>
        )}

        {/* Available Pools Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Pools</h2>
            <div className="flex gap-3">
              <CreatePoolModal onPoolCreated={handlePoolCreated} />
              <Button 
                variant="outline" 
                onClick={() => setShowAllPools(!showAllPools)}
              >
                {showAllPools ? 'Show Less' : 'Show All'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPools.map((pool) => (
              <PoolCard
                key={pool.id}
                pool={pool}
                onJoinPool={handleJoinPool}
                isUserPool={userPool?.id === pool.id}
                canJoin={!userPool || userPool.id !== pool.id}
              />
            ))}
          </div>

          {!showAllPools && availablePools.length > 3 && (
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAllPools(true)}
              >
                View All {availablePools.length} Pools
              </Button>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="ajo-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{availablePools.reduce((sum, pool) => sum + pool.participants, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ajo-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{availablePools.length}</p>
                    <p className="text-sm text-muted-foreground">Active Pools</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ajo-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{availablePools.reduce((sum, pool) => sum + pool.collected, 0).toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">SUI Collected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuvanaApp;