// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import GiftSuggestionCard from './GiftSuggestionCard';
import { userEvent } from '@testing-library/user-event';
import FeedbackView from '../FeedbackView/FeedbackView';
import GiftDetailsView from '../GiftDetailsView/GiftDetailsView';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';


const demoGiftSuggestion= {
    gift: {
        id: "string",
        title: "string",
        price: "string",
        description: "string",
        matchReasons: [],
        matchScore: 3,
        imageUrl: "string | null;,"
    },
    allGiftSuggestions: [],
    budget: "string",
    handleFeedback: jest.fn(),
    onGiftUpdate: jest.fn(),
    recipient:{
        id: "string",
        display_name: "string",
        email: "string",
        categories: [],
        created_at: "string",
        updated_at: "string",
        onboarding_complete: true
    },
    handleFeedbackView: jest.fn()
}
//Add mock for resolved values 
//add props data for null/no response(check err for feedback view and gift view)
describe('Gift Suggestion Card test',()=>{
    render(
        //figure out how what should be rendered: card, feedback, giftcardview
        <>
        <FeedbackView
        allGiftSuggestions={demoGiftSuggestion.allGiftSuggestions}
        budget={demoGiftSuggestion.budget}
        gift={demoGiftSuggestion.gift}
        handleFeedback={demoGiftSuggestion.handleFeedback()}
        onGiftUpdate={demoGiftSuggestion.onGiftUpdate()}
        recipient={demoGiftSuggestion.recipient}
        />
        <GiftDetailsView gift={demoGiftSuggestion.gift} handleFeedback={demoGiftSuggestion.handleFeedbackView} />
        </>
       
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

    
