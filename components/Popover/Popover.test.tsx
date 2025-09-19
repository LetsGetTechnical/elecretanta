// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover';

describe('Popover Component', () => {
    //use before each so I do not have rerender
    beforeAll(()=>{
        render(
            <Popover>
                <PopoverTrigger>
                </PopoverTrigger>
                <PopoverContent>
                    {/* when you write the test just test that its opening and showing content */}
                </PopoverContent>
                <PopoverAnchor/>
            </Popover>
           
        );
    })
    it('renders the popover component and nested children components', () => {
        expect(screen.getByTestId("popover-trigger")).toBeInTheDocument();
        expect(screen.getByTestId("popover-anchor")).toBeInTheDocument();
        screen.debug();   
    });
    it('', () => {
    });
    //mock data
    //mock data for content children(most commonly used in app is calendar) || none
        //not for none
    //mock data for trigger children || none
        //.not. for none
        //queryByTest() is better for null
    //----
    //confirm trigger exists in document when popover is open
    //confirm trigger exists in doc when popover is closed
    //test for the displayName
    //-------
    //confirm when popover is closed trigger is clicked it opens content(portal) 
    //needs to check if prop is set to open and closed(trigger [data-state]	"open" | "closed")
    //confirm content can be seen when popover is open
    //confirm when popover is open and trigger is clicked content is hidden
    //needs to check if prop is set to open and closed
    //confirm content cannot be seen when popoover is closed
    //-------


    //check content with and without main props passed(align, offset, className)*
    //test when content has children comp and when it does not(why? to make sure app does not break when children comp dont load)
    //test when trigger has children comp and when it does not(why? to make sure app does not break when children comp dont load)
    //++(linked to one below)test the content is always beside trigger(believe its apart of comp functionality*)
    //if anchor exist confirm its positioned beside content

    //test the if the child comp of popover exist they are nested inside of popover
    //confirm where popover exists the content and the trigger(mandatory always exist)



})

