export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16"><h1 className="text-3xl font-bold">Listing {id}</h1><p className="mt-4">Placeholder • Owned by Friend 2 (Catalog)</p></main>;
}
