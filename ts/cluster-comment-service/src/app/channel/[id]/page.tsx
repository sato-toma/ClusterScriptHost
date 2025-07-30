import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const channels = [
  { id: "work", title: "Work" },
  { id: "daily", title: "Daily" },
  { id: "private", title: "Private" },
];

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  //   const product = await fetch(`https://.../${id}`).then((res) => res.json());
  const product = channels.find((c) => c.id === id);
  if (!product) {
    return notFound();
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default function Page() {}
