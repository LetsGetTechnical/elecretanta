// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { 
  HTMLAttributes, 
  ElementRef, 
  ComponentPropsWithoutRef, 
  forwardRef, 
  useId, 
  createContext, 
  useMemo, 
  useContext, 
  JSX 
} from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  FieldError,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/Label/label';

/**
 * The root form component function that provides form context to all form fields.
 * This is an alias for react-hook-form's FormProvider function.
 * @param {Object} props - Props for the form provider
 * @returns {JSX.Element} A form context provider component
 */
const Form = FormProvider;

/**
 * Context for form field values and state.
 * @template TFieldValues - Type for the form values object
 * @template TName - Type for the field name, must be a valid path in TFieldValues
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  id?: string;
  formItemId?: string;
  formDescriptionId?: string;
  formMessageId?: string;
  error?: FieldError;
  isTouched?: boolean;
  isDirty?: boolean;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * A form field component that wraps react-hook-form's Controller.
 * @template TFieldValues - Type for the form values object
 * @template TName - Type for the field name, must be a valid path in TFieldValues
 * @param {ControllerProps<TFieldValues, TName>} props - Props for the Controller component
 * @returns {JSX.Element} A form field component
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
  }: ControllerProps<TFieldValues, TName>): JSX.Element => {
  const value = useMemo(() => ({ name: props.name }), [props.name]);
  return (
    <FormFieldContext.Provider value={value}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Custom hook that provides form field context and state information.
 * @returns {FormFieldContextValue} Form field information object
 */
const useFormField = (): FormFieldContextValue => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/**
 * A form item component that wraps a div element.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Props for the div element
 * @returns {JSX.Element} A form item component
 */
const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();
  const value = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={value}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

type FormLabelProps = ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> & {
  className?: string;
};

/**
 * A form label component that wraps a label element.
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Props for the label element
 * @returns {JSX.Element} A form label component
 */
const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

/**
 * A form control component that wraps a slot element. This is where the actual input element is rendered. 
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - Props for the slot element
 * @returns {JSX.Element} A form control component
 */
const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

/**
 * A form description component that displays helper text for a form field.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Props for the paragraph element
 * @returns {JSX.Element} A form description component
 */
const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

/**
 * A form message component that displays error or success messages for a form field.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Props for the paragraph element
 * @returns {JSX.Element} A form message component
 */
const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
