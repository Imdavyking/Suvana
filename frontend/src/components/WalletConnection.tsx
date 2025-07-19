import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectionProps {
  onConnectionChange: (connected: boolean, address?: string) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    setTimeout(() => {
      const demoAddress = '0x8b4f...c2a9';
      setWalletAddress(demoAddress);
      setIsConnected(true);
      setIsConnecting(false);
      onConnectionChange(true, demoAddress);
      
      toast({
        title: "Wallet Connected!",
        description: `Connected to ${demoAddress}`,
        variant: "default",
      });
    }, 2000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    onConnectionChange(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your Sui wallet has been disconnected",
    });
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{walletAddress}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={disconnectWallet}
          className="text-muted-foreground hover:text-foreground"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="wallet" 
      size="sm"
      onClick={connectWallet}
      disabled={isConnecting}
      className="font-semibold px-2 py-1 text-sm"
    >
      <Wallet className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect Sui Wallet'}
    </Button>
  );
};

export default WalletConnection;