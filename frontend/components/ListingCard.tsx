import type { Listing } from "@/lib/api";

export default function ListingCard({ item }: { item: Listing }) {
  return <article>{item.title}</article>;
}