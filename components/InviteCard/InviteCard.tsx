import { Card, CardContent } from '@/components/Card/Card';
import { Button } from '@/components/Button/button';
import { Input } from '@/components/Input/Input';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface IInviteCard {
  inviteLink: string;
}

export const InviteCard = ({ inviteLink }: IInviteCard) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
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
          <Input
            type="text"
            readOnly
            value={inviteLink}
            onClick={handleCopyLink}
            className={`${copied ? 'bg-giftSuggestionTextGreen border-elfHeaderGreen text-white' : ''}`}
          />
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
