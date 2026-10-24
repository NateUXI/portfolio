import FloatingNav from '@/components/FloatingNav'

export const metadata = { title: 'Billy Buttons — Website Demo' }

export default function BillyButtonsDemoPage() {
  return (
    <main className="fixed inset-0 bg-white">
      <iframe
        src="/billy-demo/index.html"
        title="Billy Buttons website demo"
        className="absolute inset-0 z-0 h-full w-full border-0"
      />
      <FloatingNav />
    </main>
  )
}
