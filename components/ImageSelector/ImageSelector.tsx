'use client';

import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/RadioGroup/radio-group';
import { Label } from '@/components/Label/Label';

interface ImageSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const images = [
    {
      id: 'image1',
      src: 'https://images.unsplash.com/photo-1480632563560-30f503c09195?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNocmlzdG1hcyUyMGNoYXJhY3RlcnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Image 1',
    },
    {
      id: 'image2',
      src: 'https://plus.unsplash.com/premium_photo-1681426549371-f85391e73e60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbGlkYXklMjBjaGFyYWN0ZXJzfGVufDB8fDB8fHww',
      alt: 'Image 2',
    },
    {
      id: 'image3',
      src: 'https://plus.unsplash.com/premium_photo-1669242712308-4b0aef7166da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzJTIwY2hhcmFjdGVyfGVufDB8fDB8fHww',
      alt: 'Image 3',
    },
  ];

  const handleValueChange = (id: string) => {
    const selectedImage = images.find((image) => image.id === id);
    if (selectedImage && onChange) {
      onChange(selectedImage.src);
    }
  };

  return (
    <RadioGroup
      value={value}
      onValueChange={handleValueChange}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5"
    >
      {images.map((image) => (
        <div key={image.id}>
          <RadioGroupItem
            value={image.id}
            id={image.id}
            className="peer sr-only"
          />
          <Label htmlFor={image.id} className="cursor-pointer">
            <Card
              className="overflow-hidden transition-all hover:ring-2 hover:ring-primary data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
              data-state={value === image.src ? 'checked' : 'unchecked'}
            >
              <div className="relative aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill={true}
                  style={{ objectFit: 'cover' }} // Use the style prop for objectFit
                />
              </div>
              <div className="p-4">
                <p className="text-center font-medium">{image.alt}</p>
              </div>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
