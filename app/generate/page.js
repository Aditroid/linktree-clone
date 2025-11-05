import { Suspense } from 'react'
import GenerateContent from './GenerateContent'
import Loading from './loading'

export const dynamic = 'force-dynamic'

export default function GeneratePage() {
  return (
    <Suspense fallback={<Loading />}>
      <GenerateContent />
    </Suspense>
  )
}