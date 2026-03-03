// Button component using Figma tokens
// Based on Figma design: Parent Design System - Button component

import { useState, useEffect } from 'react';

// Import all theme tokens
import oyoTokens from '../../tokens/theme/oyo.tokens.json';
import belvillaTokens from '../../tokens/theme/belvilla.tokens.json';
import checkinTokens from '../../tokens/theme/CheckIn.tokens.json';
import dancenterTokens from '../../tokens/theme/dancenter.tokens.json';
import motel6Tokens from '../../tokens/theme/Motel 6.tokens.json';
import studio6Tokens from '../../tokens/theme/Studio 6.tokens.json';

// Import dimension tokens for responsive behavior
import desktopDimensionTokens from '../../tokens/dimension/desktop.tokens.json';
import mobileDimensionTokens from '../../tokens/dimension/mobile.tokens.json';

// Breakpoint for switching between mobile and desktop tokens
const BREAKPOINT = 800;

// Custom hook to detect if viewport is mobile
function useIsMobile(breakpoint: number = BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

// Theme map for easy access
const themeMap: Record<string, any> = {
  oyo: oyoTokens,
  belvilla: belvillaTokens,
  checkin: checkinTokens,
  dancenter: dancenterTokens,
  'motel-6': motel6Tokens,
  'studio-6': studio6Tokens,
};

export type ThemeName = 'oyo' | 'belvilla' | 'checkin' | 'dancenter' | 'motel-6' | 'studio-6';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'hyperlink' | 'underlined' | 'neutral';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  label?: string;
  label1?: boolean;
  leadingIcon?: boolean;
  leadingIcon1?: React.ReactNode | null;
  onBackground?: boolean;
  size?: ButtonSize;
  split?: boolean;
  theme?: ThemeName;
  trailingIcon?: boolean;
  trailingIcon1?: React.ReactNode | null;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export function Button({
  children,
  isDisabled = false,
  isHovered = false,
  isPressed = false,
  label = 'Button',
  label1 = true,
  leadingIcon = false,
  leadingIcon1 = null,
  onBackground, // Reserved for future use
  size = 'xs',
  split = false,
  theme: themeName = 'oyo',
  trailingIcon = false,
  trailingIcon1 = null,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  // onBackground is reserved for future use
  void onBackground;
  // Use provided props instead of internal state
  const displayLabel = children !== undefined ? children : label;
  
  // Responsive dimension tokens: mobile below 800px, desktop above
  const isMobile = useIsMobile();
  const dimension: any = isMobile ? mobileDimensionTokens : desktopDimensionTokens;

  // Get theme based on prop
  const theme: any = themeMap[themeName] || themeMap.oyo;

  // ========================================
  // SEMANTIC COLOR TOKENS
  // ========================================
  
  // PRIMARY VARIANT - filled with brand primary color
  const bgColorPrimary = theme?.colour?.background?.intense?.brand?.primary?.$value?.hex || '#D61132';
  const hoverColorPrimary = theme?.colour?.interaction?.background?.intense?.brand?.primary?.hover?.$value?.hex || '#F04763';
  const pressedColorPrimary = theme?.colour?.interaction?.background?.intense?.brand?.primary?.pressed?.$value?.hex || '#A10D26';
  const textColorOnPrimary = theme?.colour?.text?.intense?.["on"]?.intense?.brand?.primary?.$value?.hex || '#FFFFFF';
  
  // SECONDARY VARIANT - filled with brand secondary color
  const bgColorSecondary = theme?.colour?.background?.intense?.brand?.secondary?.$value?.hex || '#282828';
  const hoverColorSecondary = theme?.colour?.interaction?.background?.intense?.brand?.secondary?.hover?.$value?.hex || '#383838';
  const pressedColorSecondary = theme?.colour?.interaction?.background?.intense?.brand?.secondary?.pressed?.$value?.hex || '#191919';
  const textColorOnSecondary = theme?.colour?.text?.intense?.["on"]?.intense?.brand?.secondary?.$value?.hex || '#FFFFFF';
  
  // OUTLINE VARIANT - border only with brand secondary color
  const borderColorOutline = theme?.colour?.border?.intense?.brand?.secondary?.$value?.hex || '#282828';
  const textColorOutline = theme?.colour?.text?.intense?.brand?.secondary?.$value?.hex || '#282828';
  const hoverBorderColorOutline = theme?.colour?.interaction?.border?.intense?.brand?.secondary?.hover?.$value?.hex || '#282828';
  
  // LINK VARIANT - hyperlink style
  const textColorLink = theme?.hyperlink?.colour?.active?.$value?.hex || '#006AD4';
  const hoverColorLink = theme?.hyperlink?.colour?.interaction?.hover?.$value?.hex || '#0B85FF';
  const hoverBgLink = theme?.colour?.background?.subtle?.info?.$value?.hex || '#EFF7FF';
  
  // UNDERLINED VARIANT - neutral text with underline
  const textColorUnderlined = theme?.colour?.text?.intense?.neutral?.$value?.hex || '#282828';
  const hoverBgUnderlined = theme?.colour?.interaction?.background?.subtle?.neutral?.["1"]?.hover?.$value?.hex || '#F5F5F5';
  
  // ========================================
  // SEMANTIC BUTTON SIZE TOKENS
  // ========================================
  
  // Border width (button.size.border.width)
  const borderWidthActive = theme?.button?.size?.border?.width?.active?.$value ?? 1;
  const borderWidthHover = theme?.button?.size?.interaction?.border?.width?.hover?.$value ?? 2;
  const borderWidthPressed = theme?.button?.size?.interaction?.border?.width?.pressed?.$value ?? 1;
  
  // ========================================
  // SEMANTIC TYPOGRAPHY TOKENS
  // ========================================
  
  // Font family (font.family.body - used for buttons)
  const fontFamily = theme?.font?.family?.body?.$value || 'Inter';
  
  // Font sizes (font.size) - button 1 for lg, button 2 for sm/md
  const fontSizeButton1 = theme?.font?.size?.["button 1"]?.$value || 16;
  const fontSizeButton2 = theme?.font?.size?.["button 2"]?.$value || 14;
  
  // Font weight (font.weight.medium - used for buttons)
  const fontWeight = theme?.font?.weight?.medium?.$value || 600;
  
  // Line height (font.line-height.button)
  const lineHeight = theme?.font?.["line-height"]?.button?.$value || 24;
  
  // Letter spacing (font.letter-spacing.button)
  // Using ?? to allow 0 as a valid value
  const letterSpacing = theme?.font?.["letter-spacing"]?.button?.$value ?? 0;
  
  // ========================================
  // SEMANTIC SPACING TOKENS (responsive: dimension tokens)
  // ========================================
  
  // Fixed spacing tokens from dimension (responsive mobile/desktop)
  const fixed50 = dimension?.fixed?.["50"]?.$value ?? 4;     // fixed/50 = 4px
  const fixed100 = dimension?.fixed?.["100"]?.$value ?? 8;   // fixed/100 = 8px
  
  // Scale spacing tokens from dimension (responsive mobile/desktop)
  const scale50 = dimension?.scale?.["50"]?.$value ?? 4;     // scale/50 = 4px
  const scale100 = dimension?.scale?.["100"]?.$value ?? 8;   // scale/100 = 8px
  const scale150 = dimension?.scale?.["150"]?.$value ?? 12;  // scale/150 = 12px
  const scale300 = dimension?.scale?.["300"]?.$value ?? 24;  // scale/300 = 24px
  const scale400 = dimension?.scale?.["400"]?.$value ?? 32;  // scale/400 = 32px
  
  // Icon sizes from dimension tokens
  const iconSizeSmall = dimension?.fixed?.["200"]?.$value ?? 16;  // 16px for xs, sm, md
  const iconSizeLarge = dimension?.fixed?.["300"]?.$value ?? 24;  // 24px for lg
  
  // Map variant - the variant type already supports all values
  const mappedVariant = variant;

  // Size-specific styles matching Figma exactly
  const sizeStyles: Record<ButtonSize, {
    paddingY: number;
    paddingX: number;
    labelPaddingX: number;
    gap: number;
    fontSize: number;
    iconSize: number;
    minWidth: number;
    borderRadius: number;
  }> = {
    xs: {
      paddingY: 0,                    // No vertical padding
      paddingX: fixed50,              // fixed/50 = 4px
      labelPaddingX: fixed50,         // fixed/50 = 4px - spacing between icons and text
      gap: 0,                         // No gap for xs
      fontSize: fontSizeButton2,      // 14px
      iconSize: iconSizeSmall,        // 16px
      minWidth: 48,                   // min-width: 48px
      borderRadius: theme?.button?.size?.border?.radius?.xs?.$value ?? 8,
    },
    sm: {
      paddingY: scale50,              // scale/50 = 4px
      paddingX: scale100,             // scale/100 = 8px
      labelPaddingX: fixed50,         // fixed/50 = 4px
      gap: fixed50,                   // fixed/50 = 4px
      fontSize: fontSizeButton2,      // 14px
      iconSize: iconSizeSmall,        // 16px
      minWidth: 80,                   // min-width: 80px
      borderRadius: theme?.button?.size?.border?.radius?.sm?.$value ?? 8,
    },
    md: {
      paddingY: scale100,             // scale/100 = 8px
      paddingX: scale300,             // scale/300 = 24px
      labelPaddingX: fixed50,         // fixed/50 = 4px (same for all sizes)
      gap: fixed100,                  // fixed/100 = 8px
      fontSize: fontSizeButton2,      // 14px
      iconSize: iconSizeSmall,        // 16px
      minWidth: 72,                   // min-width: 72px
      borderRadius: theme?.button?.size?.border?.radius?.sm?.$value ?? 8,
    },
    lg: {
      paddingY: scale150,             // scale/150 = 12px
      paddingX: scale400,             // scale/400 = 32px
      labelPaddingX: fixed50,         // fixed/50 = 4px (same for all sizes)
      gap: fixed100,                  // fixed/100 = 8px
      fontSize: fontSizeButton1,      // 16px
      iconSize: iconSizeLarge,        // 24px
      minWidth: 72,                   // min-width: 72px
      borderRadius: theme?.button?.size?.border?.radius?.lg?.$value ?? 12,
    },
  };

  const currentSize = sizeStyles[size];

  // ========================================
  // COMPUTED STYLES BASED ON STATE
  // ========================================
  
  const getBackgroundColor = () => {
    switch (mappedVariant) {
      case 'primary':
        if (isPressed) return pressedColorPrimary;
        if (isHovered) return hoverColorPrimary;
        return bgColorPrimary;
      case 'secondary':
        if (isPressed) return pressedColorSecondary;
        if (isHovered) return hoverColorSecondary;
        return bgColorSecondary;
      case 'tertiary':
        return 'transparent';
      case 'hyperlink':
        if (isHovered || isPressed) return hoverBgLink;
        return 'transparent';
      case 'underlined':
        if (isHovered || isPressed) return hoverBgUnderlined;
        return 'transparent';
      case 'neutral':
        return 'transparent';
      default:
        return bgColorPrimary;
    }
  };

  const getTextColor = () => {
    switch (mappedVariant) {
      case 'primary':
        return textColorOnPrimary;
      case 'secondary':
        return textColorOnSecondary;
      case 'tertiary':
        return textColorOutline;
      case 'hyperlink':
        if (isHovered || isPressed) return hoverColorLink;
        return textColorLink;
      case 'underlined':
        return textColorUnderlined;
      case 'neutral':
        return textColorUnderlined;
      default:
        return textColorOnPrimary;
    }
  };

  const getBorderWidth = () => {
    if (mappedVariant === 'tertiary') {
      if (isPressed) return borderWidthPressed;
      if (isHovered) return borderWidthHover;
      return borderWidthActive;
    }
    return 0;
  };

  const getBorderColor = () => {
    if (mappedVariant === 'tertiary') {
      if (isHovered) return hoverBorderColorOutline;
      return borderColorOutline;
    }
    return 'transparent';
  };

  const getTextDecoration = () => {
    if (mappedVariant === 'underlined') return 'underline';
    if (mappedVariant === 'hyperlink' && (isHovered || isPressed)) return 'underline';
    return 'none';
  };

  const getTextDecorationStyle = () => {
    if (mappedVariant === 'underlined') return 'dotted';
    return 'solid';
  };

  // Hyperlink and underlined variants have minimal padding
  const isMinimalVariant = mappedVariant === 'hyperlink' || mappedVariant === 'underlined' || mappedVariant === 'neutral';
  const paddingY = isMinimalVariant ? 2 : currentSize.paddingY;
  // Button outer horizontal padding (fixed/50 for xs, scale tokens for others)
  const paddingX = isMinimalVariant ? 8 : currentSize.paddingX;
  // Label wrapper inner horizontal padding (creates spacing between icons and text)
  const labelPaddingX = isMinimalVariant ? 0 : currentSize.labelPaddingX;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        // Layout - gap for sm/md/lg, no gap for xs
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMinimalVariant ? '8px' : `${currentSize.gap}px`,
        boxSizing: 'border-box',
        minWidth: isMinimalVariant ? 'auto' : `${currentSize.minWidth}px`,
        
        // Spacing - only horizontal padding on button (vertical padding is 0 for xs)
        padding: `${paddingY}px ${paddingX}px`,
        
        // Colors (semantic theme tokens)
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        
        // Border using box-shadow inset so it doesn't affect overall size
        border: 'none',
        boxShadow: getBorderWidth() > 0 ? `inset 0 0 0 ${getBorderWidth()}px ${getBorderColor()}` : 'none',
        borderRadius: isMinimalVariant ? '8px' : `${currentSize.borderRadius}px`,
        
        // Typography (semantic font tokens)
        fontFamily: `'${fontFamily}', sans-serif`,
        fontSize: `${currentSize.fontSize}px`,
        fontWeight: mappedVariant === 'hyperlink' || mappedVariant === 'underlined' ? 400 : fontWeight,
        lineHeight: `${lineHeight}px`,
        letterSpacing: `${letterSpacing}px`,
        textDecoration: getTextDecoration(),
        textDecorationStyle: getTextDecorationStyle() as 'solid' | 'dotted',
        
        // Interaction
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition: 'all 0.15s ease',
      }}
    >
      {/* L icon - Leading icon wrapper */}
      {leadingIcon && (leadingIcon1 ? leadingIcon1 : (
        <span 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ width: currentSize.iconSize, height: currentSize.iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={currentSize.iconSize} height={currentSize.iconSize} viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      ))}
      {/* Label wrapper - contains text with horizontal padding for spacing */}
      {label1 && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${labelPaddingX}px`,
            flexShrink: 0,
          }}
        >
          {displayLabel}
        </span>
      )}
      {/* Split separator */}
      {split && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '8px',
            opacity: 0.3,
          }}
        >
          |
        </span>
      )}
      {/* T icon - Trailing icon wrapper */}
      {trailingIcon && (trailingIcon1 ? trailingIcon1 : (
        <span 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ width: currentSize.iconSize, height: currentSize.iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={currentSize.iconSize} height={currentSize.iconSize} viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      ))}
    </button>
  );
}
