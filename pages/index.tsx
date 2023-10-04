import Link from "next/link";

export default function Home() {
    return (
        <div className={'flex flex-col'}>
            <Link href={"/timelines/전쟁"}>Timeline Page</Link>
            <Link href={"/events/북한의 남침"}>Event Page</Link>
        </div>
    )
}
