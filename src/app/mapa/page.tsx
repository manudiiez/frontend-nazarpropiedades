import MapViewServer from "@/components/map/MapViewServer";

interface MapPageProps {
  searchParams: Promise<{
    department?: string;
    locality?: string;
    type?: string;
    condition?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
  }>;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen pt-20">
      <MapViewServer searchParams={params} />
    </main>
  );
}
