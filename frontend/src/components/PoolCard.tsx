import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Coins, Calendar, TrendingUp } from 'lucide-react';

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
  createdBy?: string;
}

interface PoolCardProps {
  pool: Pool;
  onJoinPool: (poolId: string) => void;
  isUserPool?: boolean;
  canJoin?: boolean;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, onJoinPool, isUserPool = false, canJoin = true }) => {
  const progressPercentage = (pool.participants / pool.size) * 100;
  const totalPayout = pool.size * pool.shareAmount;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'waiting': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`ajo-card relative overflow-hidden ${isUserPool ? 'ring-2 ring-primary/20' : ''}`}>
      {isUserPool && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
          Your Pool
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">{pool.name}</h3>
          <p className="text-sm text-muted-foreground">Pool ID: {pool.id}</p>
        </div>
        <Badge className={getStatusColor(pool.status)}>
          {pool.status}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="font-semibold">{pool.participants}/{pool.size}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Share Amount</p>
              <p className="font-semibold">{pool.shareAmount} SUI</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Pool Progress</span>
            <span className="text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="bg-muted/50 p-3 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Total Payout</span>
            </div>
            <span className="font-bold text-success">{totalPayout} SUI</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Next Payout</span>
            </div>
            <span className="text-sm text-muted-foreground">{formatDate(pool.nextPayout)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cycle</span>
            <span className="text-sm font-semibold">{pool.currentCycle}/{pool.totalCycles}</span>
          </div>
        </div>

        {!isUserPool && canJoin && pool.participants < pool.size && (
          <Button 
            onClick={() => onJoinPool(pool.id)}
            variant="ajo"
            className="w-full"
          >
            Join Ajo Pool
          </Button>
        )}
        
        {!isUserPool && pool.participants >= pool.size && (
          <Button variant="secondary" disabled className="w-full">
            Pool Full
          </Button>
        )}
      </div>
    </div>
  );
};

export default PoolCard;