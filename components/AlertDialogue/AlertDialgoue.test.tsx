import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {

AlertDialog,
AlertDialogTrigger,
AlertDialogContent,
AlertDialogHeader,
AlertDialogFooter,
AlertDialogTitle,
AlertDialogDescription,
AlertDialogAction,
AlertDialogCancel,
} from './AlertDialgoue';

// The following code is co-pilot generated for the purposes of validating the jest and testing library setup.
// I will create a separate branch and update this test file after the pull request is accepted.

describe('AlertDialog Component', () => {
it('renders the AlertDialog and opens on trigger click', () => {
    render(
        <AlertDialog>
            <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Test Title</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>Test Description</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    // Verify trigger button is rendered
    const triggerButton = screen.getByText('Open Dialog');
    expect(triggerButton).toBeInTheDocument();

    // Click the trigger button
    fireEvent.click(triggerButton);

    // Verify dialog content is rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
});

it('closes the AlertDialog when Cancel button is clicked', () => {
    render(
        <AlertDialog>
            <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Test Title</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>Test Description</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Verify dialog is open
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Verify dialog is closed
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
});

it('calls the Confirm action when Confirm button is clicked', () => {
    const onConfirm = jest.fn();

    render(
        <AlertDialog>
            <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Test Title</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>Test Description</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Click the Confirm button
    fireEvent.click(screen.getByText('Confirm'));

    // Verify the Confirm action was called
    expect(onConfirm).toHaveBeenCalledTimes(1);
});
});