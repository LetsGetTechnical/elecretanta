export interface Profile {
    id: string;
    name: string;
    email: string;
    age_group?: string;
    categories: string[];
    hobbies?: string;
    avoid?: string;
    practical_whimsical?: number;
    cozy_adventurous?: number;
    minimal_luxurious?: number;
    created_at: string;
    updated_at: string;
  }
  
  export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
