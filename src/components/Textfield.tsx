import { useState, type Ref } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

// Colors from shadcn/ui's default "neutral" theme (light mode)
const colors = {
  foreground: '#0a0a0a',
  mutedForeground: '#737373',
  input: '#e5e5e5',
  ring: '#a1a1a1',
  destructive: '#e7000b',
  primary: '#171717',
};

type Props = TextInputProps & {
  invalid?: boolean;
  ref?: Ref<TextInput>;
};

export function Textfield({
  invalid = false,
  editable = true,
  style,
  onFocus,
  onBlur,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={colors.mutedForeground}
      selectionColor={colors.primary}
      {...props}
      editable={editable}
      onFocus={event => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={event => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={[
        styles.base,
        focused && styles.focused,
        invalid && styles.invalid,
        invalid && focused && styles.invalidFocused,
        !editable && styles.disabled,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: 8,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: colors.foreground,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  focused: {
    borderColor: colors.ring,
    boxShadow: '0 0 0 3px rgba(161, 161, 161, 0.5)',
  },
  invalid: {
    borderColor: colors.destructive,
  },
  invalidFocused: {
    boxShadow: '0 0 0 3px rgba(231, 0, 11, 0.2)',
  },
  disabled: {
    opacity: 0.5,
  },
});