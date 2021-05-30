import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import type {ForwardRefRenderFunction, ComponentProps} from 'react';
import {Keyboard, TextInput as RNTextInput} from 'react-native';
import {TextInput} from '../theme/paper';
import {TextInputProps} from '../theme/paper';

export type TextInputMethods = {
  focus: () => void;
  dismiss: () => void;
};
export type ImperativeTextInputProps = TextInputProps;

const ImperativeTextInput: ForwardRefRenderFunction<
  TextInputMethods,
  ImperativeTextInputProps
> = (props, ref) => {
  const textInputRef = useRef<RNTextInput | null>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        textInputRef.current?.focus();
      },
      dismiss() {
        Keyboard.dismiss();
      },
    }),
    [],
  );
  return <TextInput ref={textInputRef} {...props} />;
};
export default forwardRef(ImperativeTextInput);
