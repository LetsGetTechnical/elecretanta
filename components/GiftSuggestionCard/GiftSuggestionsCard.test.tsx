// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import GiftSuggestionCard from './GiftSuggestionCard';
import { userEvent } from '@testing-library/user-event';
import FeedbackView from '../FeedbackView/FeedbackView';
import GiftDetailsView from '../GiftDetailsView/GiftDetailsView';

//add props data
//add data test id for compoonents
describe('Gift Suggestion Card test',()=>{
    render(
        //figure out how what should be rendered: card, feedback, giftcardview
        <FeedbackView
        allGiftSuggestions={}
        budget={}
        gift={}
        handleFeedback={}
        onGiftUpdate={}
        recipient={}
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

    
