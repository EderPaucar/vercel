/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        sidebar: '#0F172A',
        primary: '#2563EB',
        security: '#16A34A',
        costs: '#F59E0B',
        alerts: '#DC2626',
        text: '#1E293B',
        muted: '#64748B',
        border: '#E2E8F0',
        card: '#FFFFFF',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.06)',
      },
      fontSize: {
        'main-title': ['30px', { fontWeight: '700' }],
        'subtitle': ['18px', { fontWeight: '600' }],
        'body': ['15px', { fontWeight: '400' }],
        'muted': ['13px', { fontWeight: '400' }],
      }
    },
  },
  plugins: [],
}
