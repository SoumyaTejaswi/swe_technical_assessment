import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src="https://tummala.inc/wp-content/uploads/elementor/thumbs/cropped-tummalainc-favicon-1-qelqogc6wt9o8hciy2bpxs0sspdp1gzlzanthwqsjm.png"
        alt="Tummala Motors Logo"
        width={48}
        height={48}
        className="rounded-lg shadow-md"
      />
    </Link>
  )
}

