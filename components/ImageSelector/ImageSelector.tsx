"use client";

import Image from "next/image";
import { Card } from "@/components/Card/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/RadioGroup/radio-group";
import { Label } from "@/components/Label/label";

interface ImageSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const images = [
    {
      id: "image1",
      src: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 1",
    },
    {
      id: "image2",
      src: "https://images.unsplash.com/photo-1634038036367-7c0e7a95fa4c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 2",
    },
    {
      id: "image3",
      src: "https://plus.unsplash.com/premium_photo-1668654056797-061fc37d99b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 3",
    },
  ];

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
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
            <Card className="overflow-hidden transition-all hover:ring-2 hover:ring-primary peer-aria-checked:ring-2 peer-aria-checked:ring-primary">
              <div className="relative aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill={true}
                  style={{ objectFit: "cover" }} // Use the style prop for objectFit
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
