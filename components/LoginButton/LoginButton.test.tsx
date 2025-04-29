import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LoginButton from './LoginButton';
import { signInWithGoogle } from '@/lib/utils';

// Initially 
//  - isLoading is false 
//  - button displays with G svg and text "Continue with Google"
//  - button is not disabled

// When isLoading is false
//  - button displays G svg and text "Continue with Google"
//  - button is not disabled


// When button is clicked:
//  - isLoading is set to true
//  - button displays loading spinner
//  - button is disabled
// - signIn function is called

// When isLoading is true
//  - button displays loading spinner
//  - button is disabled


// When signIn function is called
//  - isLoading is set to true
//  - button displays loading spinner
//  - button is disabled
//  - eventually isLoading is set to false


// If signInWithGoogle throws an error
//  - error is logged to console
//  - isLoading is set to false

// If signInWithGoogle resolves successfully
//  - isLoading is then set to false
















