// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import Timeline from '../components/timeline'
import {useRef} from "react";

export default function Home() {
    const scrollRef = useRef(null)

  return (
      // scroll happening in this layer
    <div ref={scrollRef} className={'index pt-[60px] h-screen overflow-scroll flex justify-center'}>
        <Timeline scrollRef={scrollRef} />
    </div>
  )
}
