import { Card, CardContent } from '@/components/Card2/Card';
import { Button } from '@/components/Button/button';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const InviteCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="w-full bg-gray-50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Invite Others</h3>
          <Button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy invite link
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
