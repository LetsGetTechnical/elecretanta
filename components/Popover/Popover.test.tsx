// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover';
import userEvent from '@testing-library/user-event'

describe('Popover Component', () => {
    describe('Popover Component without data', () => {
        beforeEach(() => {
            render(
                <Popover>
                    <PopoverTrigger>
                    </PopoverTrigger>
                    <PopoverContent>
                    </PopoverContent>
                    <PopoverAnchor />
                </Popover>

            );
        })
        const user = userEvent.setup()
        it('renders the popover component and nested children components', () => {
            expect(screen.getByTestId("popover-trigger")).toBeInTheDocument();
            expect(screen.getByTestId("popover-anchor")).toBeInTheDocument();
        });
        it('popover opens when content is empty', async() => {
            await user.click(screen.getByTestId("popover-trigger"))
            expect(screen.getByTestId("popover-content")).toBeInTheDocument();
        });
    })
    describe('Popover Component with  data', () => {
        beforeEach(() => {
            render(
                <Popover>
                    <PopoverTrigger>
                        button
                    </PopoverTrigger>
                    <PopoverContent>
                        Content Here
                    </PopoverContent>
                    <PopoverAnchor />
                </Popover>
            );
        })
        const user = userEvent.setup()
        it('renders content inside of trigger component', () => {
            expect(screen.getByText("button")).toBeInTheDocument();
        })
        it('when popover is closed, content is not visible', ()=>{
            expect(screen.queryByText("Content Here")).not.toBeInTheDocument();
        })
        // it('trigger renders when popover is opened', () => {
        //     expect(screen.getByText("button")).toBeInTheDocument();
        // })
        it('Content renders when popover is opened', async () => {
            await user.click(screen.getByText('button'))
            expect(screen.queryByText("Content Here")).toBeInTheDocument();
        })
        it('Content not visible when popover is opened then closed', async () => {
            await user.click(screen.getByText('button'))
            expect(screen.queryByText("Content Here")).toBeInTheDocument();

            await user.click(screen.getByText('button'))
            expect(screen.queryByText("Content Here")).not.toBeInTheDocument();
        })
        

    });
    describe('Popover Component with attributes while popover is open', () => {
        beforeEach(async() => {
            render(
                <Popover>
                    <PopoverTrigger>
                        button
                    </PopoverTrigger>
                    <PopoverContent>
                        Content Here
                    </PopoverContent>
                    <PopoverAnchor />
                </Popover>
            );
            const user = userEvent.setup()
            await user.click(screen.getByText('button'))
        })
        it('applies align attribute to content element', () => {
            const content = screen.queryByText("Content Here")

            expect(content).toBeInTheDocument()
            expect(content).toHaveAttribute('align', 'center' );

        })
        it('applies the sideOffset attribute to content element', ()=>{
            expect(screen.queryByText("Content Here")).toBeInTheDocument();
        })
     
    })
        



   //confirm content renders default values for attributes
   //confirm content accepts other values for default attribute
    //++(linked to one below)test the content is always beside trigger(believe its apart of comp functionality*)
    //if anchor exist confirm its positioned beside content
    
 
    

   



})

