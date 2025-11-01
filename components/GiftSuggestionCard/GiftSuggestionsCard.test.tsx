// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import GiftSuggestionCard from './GiftSuggestionCard';
import { userEvent } from '@testing-library/user-event';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

jest.mock('@/app/types/giftSuggestion',()=>{

})

const mockProfile: Profile = {
    id: '1',
    display_name: 'Test User',
    email: 'test@example.com',
    categories: ['test'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    onboarding_complete: true,
  };
  const mockGiftSuggestion: IGiftSuggestion = {
    id: '1',
    title: 'Test Gift',
    price: '100',
    description: 'Test Description',
    matchReasons: ['test reason'],
    matchScore: 0.8,
    imageUrl: 'test.jpg',
  };
  
  //Mock onGiftUpdate(only)
  const handleGiftUpdate = jest.fn()

//add props data for null/no response(check err for feedback view and gift view)
describe('Gift Suggestion Card test',()=>{
    render(
        //figure out how what should be rendered: card, feedback, giftcardview
  
       <GiftSuggestionCard 
            allGiftSuggestions={[]}
            budget={''}
            gift={mockGiftSuggestion}
            index={3}
            onGiftUpdate={handleGiftUpdate}
            recipient={mockProfile}
        />
    )
  
    // it('confirm card renders',()=>{

        
    // });
    // it('confirm FeedbackView renders when state is true',()=>{
    //     //set state as true
        
    // });
    // it('confirm GiftDetailsView renders when state is false',()=>{
        
    // });
    // it('confirm handleGiftUpdate changes states to false',()=>{

    // });
    // it('confirm handleGiftUpdate stays false if it stays false',()=>{
    //     //may not be needed because starting state should always be false
    // });
    // it('confirm handleGiftUpdate returns a Promise',()=>{
    //     //may be out of scope for this test
    // });
    // it('fails when no params are passed',()=>{
    //     //may be out of scope for this test bc error handling is not in component
    // });
    // it('confirm handleFeedbackView returns a changes state from true to false',()=>{
    // });
    // it('confirm handleFeedbackView returns a changes state from false to true',()=>{
    // });

})

    
