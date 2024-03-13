import { Metadata } from "next"
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "iNote - Simple, Functional, Write with AI",
  description = "iNote features a minimalist design that focuses on simplicity and functionality, providing a distraction-free note-taking environment and fast response time. In addition, iNote is supercharged with a AI writer, which makes it a powerful tool for note-taking and content creation.",
  image = "/inote-thumbnail.png",
  icons = "/logo.svg",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@chrislonzo"
    },
    icons,
    metadataBase: new URL('https://inote-six.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
