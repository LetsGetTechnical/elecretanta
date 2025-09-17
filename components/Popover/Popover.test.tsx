// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover';

describe('Popover Component', () => {
    it('renders the popover component and nested children components', () => {
        render(
            <Popover>
            </Popover>
        );
        
        // expect(screen.queryByTestId("popover-parent")).toBeInTheDocument();
        expect(screen.getByText("boom")).toBeInTheDocument();//content does not exist in doc until portal 

        screen.debug();   
    });
    //mock data
    //mock data for content children(most commonly used in app is calendar) || none
    //mock data for trigger children || none
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


    //check content with and without main props passed(align, offset)*
    //test when content has children comp and when it does not(why? to make sure app does not break when children comp dont load)
    //test when trigger has children comp and when it does not(why? to make sure app does not break when children comp dont load)
    //(linked to one below)test the content is always beside trigger(believe its apart of comp functionality*)
    //if anchor exist confirm its positioned beside content

    //test the if the child comp of popover exist they are nested inside of popover
    //confirm where popover exists the content and the trigger(mandatory always exist)



})

//Testing if the popover opens(displays content), closes(hide content),