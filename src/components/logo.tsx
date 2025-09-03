import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <div className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat text-transparent">
        <h1 className="text-xl font-semibold">CoderCodes</h1>
      </div>
    </Link>
  )
}
