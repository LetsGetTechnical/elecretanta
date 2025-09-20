// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

/**
 * Root component that contains all the parts of a select.
 * Manages the selection state and handles all the interactions.
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#root}
 */
const Select = SelectPrimitive.Root;

/**
 * Component used to group multiple items.
 * Use in conjunction with Select.Label to ensure good accessibility via automatic labelling.
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#group}
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * Component that reflects the selected value.
 * Appears in the trigger when a value is selected.
 * By default the selected item's text will be rendered.
 * If you require more control, you can instead control the select and pass your own children.
 * It should not be styled to ensure correct positioning.
 * An optional placeholder prop is also available for when the select has no value.
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#value}
 */
const SelectValue = SelectPrimitive.Value;

export { Select, SelectGroup, SelectValue };
