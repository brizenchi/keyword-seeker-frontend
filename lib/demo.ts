/**
 * Demo mode: app pages run on demo data and skip the sign-in gate, so the product can be clicked
 * through without the backend. Turn it off (or leave NEXT_PUBLIC_DEMO_MODE unset) in production.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
