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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  //   const product = await fetch(`https://.../${id}`).then((res) => res.json());
  const product = channels.find((c) => c.id === id);
  if (!product) {
    return notFound();
  }

  return {
    title: product.title,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const channel = channels.find((c) => c.id === id);

  if (!channel) {
    notFound();
  }
  return (
    <div>
      <h1>Channel: {channel.title}</h1>
      <p>ID: {channel.id}</p>
    </div>
  );
}
