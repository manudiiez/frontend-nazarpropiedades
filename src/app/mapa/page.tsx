import MapViewServer from "@/components/map/MapViewServer";

interface MapPageProps {
  searchParams: Promise<{
    department?: string;
    locality?: string;
    type?: string;
    condition?: string;
    search?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
    page?: string;
  }>;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen pt-20">
      {/* <MapViewServer searchParams={params} /> */}
      <h1 className="pt-20 px-8">En desarrollo...</h1>
    </main>
  );
}


// Falta que se recargue bien al hacer zoom y cambia rde ubicacion, paginaxion, y que al seleccionar se scrollee hasta esa parte