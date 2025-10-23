'use client';

import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { RadioGroupItem } from '@/components/RadioGroup/RadioGroupItem';
import { Label } from '@/components/Label/Label';
import { GroupImage } from './IImageSelector';

export const GROUP_IMAGES: GroupImage[] = [
  {
    id: '1',
    title: 'Old-timey parcels',
    src: 'https://images.unsplash.com/photo-1480632563560-30f503c09195?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNocmlzdG1hcyUyMGNoYXJhY3RlcnxlbnwwfHwwfHx8MA%3D%3D',
    loader: ({ src, width, quality }) =>
      `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality || 75}"}`,
    alt: 'Old-fashioned wrapped Christmas gifts.',
  },
  {
    id: '2',
    title: 'Gifts under the tree',
    src: 'https://plus.unsplash.com/premium_photo-1681426549371-f85391e73e60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbGlkYXklMjBjaGFyYWN0ZXJzfGVufDB8fDB8fHww',
    loader: ({ src, width, quality }) =>
      `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality || 75}"}`,
    alt: 'Bright cartoony characters with gifts under a tree.',
  },
  {
    id: '3',
    title: 'Opening a gift box',
    src: 'https://plus.unsplash.com/premium_photo-1669242712308-4b0aef7166da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzJTIwY2hhcmFjdGVyfGVufDB8fDB8fHww',
    loader: ({ src, width, quality }) =>
      `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality || 75}"}`,
    alt: 'Illustration of a gift box with the lid swinging up.',
  },
];

interface ImageSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const handleValueChange = (id: string) => {
    const selectedImage = GROUP_IMAGES.find((image) => image.id === id);
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
      {GROUP_IMAGES.map((image) => (
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
              role="figure"
            >
              <div className="relative aspect-video">
                <Image
                  loader={image.loader}
                  src={image.src}
                  alt={image.alt}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: 'cover' }} // Use the style prop for objectFit
                />
              </div>
              <figcaption className="p-4 font-medium text-center">
                {image.title}
              </figcaption>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
