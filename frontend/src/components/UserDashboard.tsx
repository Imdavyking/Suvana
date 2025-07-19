import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Calendar, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';

interface Pool {
  id: string;
  name: string;
  size: number;
  shareAmount: number;
  cycleDuration: number;
  currentCycle: number;
  totalCycles: number;
  participants: number;
  collected: number;
  status: 'active' | 'waiting' | 'completed';
  nextPayout: Date;
  userPosition?: number;
  lastContribution?: Date;
}

interface UserDashboardProps {
  userPool: Pool | null;
  onContribute: (poolId: string) => void;
  walletAddress: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userPool, onContribute, walletAddress }) => {
  if (!userPool) {
    return (
      <div className="ajo-card text-center py-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Active Ajo Pool</h3>
        <p className="text-muted-foreground mb-4">Join or create your first ajo pool to start building wealth with your community.</p>
      </div>
    );
  }

  const progressPercentage = (userPool.currentCycle / userPool.totalCycles) * 100;
  const nextContributionDue = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const isContributionDue = userPool.lastContribution ? 
    (Date.now() - userPool.lastContribution.getTime()) > (userPool.cycleDuration * 24 * 60 * 60 * 1000) : true;

  const getUserPayoutCycle = () => {
    if (userPool.userPosition) {
      return userPool.userPosition;
    }
    return Math.floor(Math.random() * userPool.totalCycles) + 1;
  };

  const getUserPayoutDate = () => {
    const payoutCycle = getUserPayoutCycle();
    const daysUntilPayout = (payoutCycle - userPool.currentCycle) * userPool.cycleDuration;
    return new Date(Date.now() + daysUntilPayout * 24 * 60 * 60 * 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="ajo-pattern relative overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-primary">{userPool.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Your Active Ajo Pool</p>
            </div>
            <Badge className="bg-success text-success-foreground">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Coins className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Share Amount</p>
              <p className="text-lg font-bold text-primary">{userPool.shareAmount} SUI</p>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="text-lg font-bold">{userPool.participants}/{userPool.size}</p>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Payout</p>
              <p className="text-lg font-bold text-success">{userPool.size * userPool.shareAmount} SUI</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Pool Progress</span>
              <span className="text-sm text-muted-foreground">Cycle {userPool.currentCycle}/{userPool.totalCycles}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`ajo-card ${isContributionDue ? 'ring-2 ring-warning/50' : ''}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              Next Contribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Amount Due</span>
                <span className="text-xl font-bold text-warning">{userPool.shareAmount} SUI</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Due Date</span>
                <span className="font-medium">{nextContributionDue.toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => onContribute(userPool.id)}
              variant={isContributionDue ? "warning" : "ajo"}
              className="w-full"
              size="lg"
            >
              <Coins className="w-4 h-4" />
              {isContributionDue ? 'Pay Overdue Contribution' : 'Contribute Now'}
            </Button>
          </CardContent>
        </Card>

        <Card className="ajo-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-success" />
              Your Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Payout Amount</span>
                <span className="text-xl font-bold text-success">{userPool.size * userPool.shareAmount} SUI</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground">Your Turn</span>
                <span className="font-medium">Cycle {getUserPayoutCycle()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Expected Date</span>
                <span className="font-medium">{getUserPayoutDate().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <span>Stay consistent with contributions</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="ajo-card">
        <CardHeader>
          <CardTitle className="text-lg">Pool Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{userPool.collected}</p>
              <p className="text-sm text-muted-foreground">SUI Collected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{userPool.currentCycle}</p>
              <p className="text-sm text-muted-foreground">Current Cycle</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{userPool.cycleDuration}</p>
              <p className="text-sm text-muted-foreground">Days per Cycle</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{userPool.totalCycles - userPool.currentCycle}</p>
              <p className="text-sm text-muted-foreground">Cycles Left</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;