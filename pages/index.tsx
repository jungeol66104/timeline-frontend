// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import Timeline from '../components/timeline'

export default function Home() {
  return (
    <div className={'pt-[60px] max-w-lg'}>
      <Timeline />
    </div>
  )
}
