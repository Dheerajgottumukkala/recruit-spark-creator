import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// OpenNote-inspired Brand Colors
				brand: {
					purple: 'hsl(var(--brand-purple))',
					'purple-light': 'hsl(var(--brand-purple-light))',
					'purple-dark': 'hsl(var(--brand-purple-dark))',
					blue: 'hsl(var(--brand-blue))',
					'blue-light': 'hsl(var(--brand-blue-light))',
					'blue-dark': 'hsl(var(--brand-blue-dark))',
					gray: 'hsl(var(--brand-gray))',
					'gray-light': 'hsl(var(--brand-gray-light))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-tertiary': 'var(--gradient-tertiary)',
				'gradient-bg': 'var(--gradient-bg)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-hover': 'var(--gradient-hover)'
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'glow': 'var(--shadow-glow)',
				'button': 'var(--shadow-button)',
				'hover': 'var(--shadow-hover)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				'fade-up': {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				'slide-up': {
					"0%": { transform: "translateY(100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				'slide-down': {
					"0%": { transform: "translateY(-100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				'scale-up': {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				'glow': {
					"0%": { boxShadow: "0 0 20px hsl(263 70% 50% / 0.4)" },
					"50%": { boxShadow: "0 0 40px hsl(316 70% 50% / 0.6), 0 0 60px hsl(316 70% 50% / 0.3)" },
					"100%": { boxShadow: "0 0 20px hsl(263 70% 50% / 0.4)" }
				},
				'float': {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" }
				},
				'pulse-slow': {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" }
				},
				'shimmer': {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" }
				},
				'gradient': {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" }
				},
				'bounce-in': {
					"0%": { transform: "scale(0.3)", opacity: "0" },
					"50%": { transform: "scale(1.1)", opacity: "0.8" },
					"70%": { transform: "scale(0.9)", opacity: "1" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				'rotate-in': {
					"0%": { transform: "rotate(-200deg) scale(0)", opacity: "0" },
					"100%": { transform: "rotate(0deg) scale(1)", opacity: "1" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'scale-up': 'scale-up 0.4s ease-out',
				'glow': 'glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'gradient': 'gradient 6s ease infinite',
				'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'rotate-in': 'rotate-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
