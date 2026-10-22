import type { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

// Colors from shadcn/ui's default "neutral" theme (light mode)
const colors = {
  primary: '#171717',
  primaryForeground: '#fafafa',
  secondary: '#f5f5f5',
  secondaryForeground: '#171717',
  destructive: '#e7000b',
  destructiveForeground: '#ffffff',
  accent: '#f5f5f5',
  border: '#e5e5e5',
  background: '#ffffff',
};

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export function CustomButton({
  variant = 'default',
  size = 'default',
  disabled,
  style,
  children,
  ...props
}: Props) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        pressed && pressedStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      {({ pressed }) =>
        typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              textStyles[variant],
              variant === 'link' && pressed && styles.underline,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

const variantStyles = StyleSheet.create({
  default: { backgroundColor: colors.primary },
  destructive: { backgroundColor: colors.destructive },
  outline: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  secondary: { backgroundColor: colors.secondary },
  ghost: { backgroundColor: 'transparent' },
  link: { backgroundColor: 'transparent' },
});

// shadcn uses hover states on the web; on mobile they become pressed states
const pressedStyles = StyleSheet.create({
  default: { opacity: 0.9 },
  destructive: { opacity: 0.9 },
  outline: { backgroundColor: colors.accent },
  secondary: { opacity: 0.8 },
  ghost: { backgroundColor: colors.accent },
  link: {},
});

const textStyles = StyleSheet.create({
  default: { color: colors.primaryForeground },
  destructive: { color: colors.destructiveForeground },
  outline: { color: colors.primary },
  secondary: { color: colors.secondaryForeground },
  ghost: { color: colors.primary },
  link: { color: colors.primary },
});

// Tailwind sizes from shadcn: h-9 px-4, h-8 px-3, h-10 px-6, size-9
const sizeStyles = StyleSheet.create({
  default: { height: 36, paddingHorizontal: 16 },
  sm: { height: 32, paddingHorizontal: 12, gap: 6 },
  lg: { height: 40, paddingHorizontal: 24 },
  icon: { height: 36, width: 36 },
});