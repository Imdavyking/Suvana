import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users, Coins, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePoolModalProps {
  onPoolCreated: (pool: any) => void;
}

const CreatePoolModal: React.FC<CreatePoolModalProps> = ({ onPoolCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poolSize, setPoolSize] = useState('10');
  const [shareAmount, setShareAmount] = useState('1');
  const [cycleDuration, setCycleDuration] = useState('30');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createPool = () => {
    setIsCreating(true);
    
    setTimeout(() => {
      const newPool = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Ajo Pool ${Math.floor(Math.random() * 1000)}`,
        size: parseInt(poolSize),
        shareAmount: parseFloat(shareAmount),
        cycleDuration: parseInt(cycleDuration),
        currentCycle: 1,
        totalCycles: parseInt(poolSize),
        participants: 1,
        collected: parseFloat(shareAmount),
        status: 'active',
        createdBy: 'you',
        nextPayout: new Date(Date.now() + parseInt(cycleDuration) * 24 * 60 * 60 * 1000),
      };
      
      onPoolCreated(newPool);
      setIsCreating(false);
      setIsOpen(false);
      
      toast({
        title: "Ajo Pool Created! 🎉",
        description: `Pool ID: ${newPool.id} • ${poolSize} members • ${shareAmount} SUI per cycle`,
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ajo" size="lg" className="w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Create Ajo Pool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ajo-pattern relative">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">
            Create New Ajo Pool
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="poolSize" className="flex items-center gap-2 font-medium">
              <Users className="w-4 h-4 text-primary" />
              Pool Size (Members)
            </Label>
            <Input
              id="poolSize"
              type="number"
              value={poolSize}
              onChange={(e) => setPoolSize(e.target.value)}
              min="2"
              max="50"
              className="ajo-transition focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">Number of people in your ajo group</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shareAmount" className="flex items-center gap-2 font-medium">
              <Coins className="w-4 h-4 text-primary" />
              Ajo Share Amount (SUI)
            </Label>
            <Input
              id="shareAmount"
              type="number"
              value={shareAmount}
              onChange={(e) => setShareAmount(e.target.value)}
              min="0.1"
              step="0.1"
              className="ajo-transition focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">Amount each member contributes per cycle</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cycleDuration" className="flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-primary" />
              Cycle Duration (Days)
            </Label>
            <Input
              id="cycleDuration"
              type="number"
              value={cycleDuration}
              onChange={(e) => setCycleDuration(e.target.value)}
              min="7"
              max="365"
              className="ajo-transition focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">How often payouts occur</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <h4 className="font-medium text-primary mb-2">Pool Summary</h4>
            <div className="space-y-1 text-sm">
              <p>• {poolSize} members will participate</p>
              <p>• Each cycle collects {parseInt(poolSize) * parseFloat(shareAmount)} SUI</p>
              <p>• One member receives payout every {cycleDuration} days</p>
              <p>• Pool completes in {parseInt(poolSize) * parseInt(cycleDuration)} days</p>
            </div>
          </div>

          <Button 
            onClick={createPool}
            disabled={isCreating}
            variant="ajo"
            size="lg"
            className="w-full"
          >
            {isCreating ? 'Creating Pool...' : 'Create Ajo Pool'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoolModal;