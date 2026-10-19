import { createAppLayout } from '@/lib/i18n/app-layout'

const { generateMetadata, Layout } = createAppLayout((t) => t.usage)

export { generateMetadata }
export default Layout
