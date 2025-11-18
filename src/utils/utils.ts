// src/lib/url-helper.ts

export const getBackendUrl = () => {
  // 1. Si estamos en el servidor y existe la variable interna (Docker Network)
  if (typeof window === 'undefined' && process.env.INTERNAL_API_URL) {
    console.log('Usando INTERNAL_API_URL para fetch en servidor');
    return process.env.INTERNAL_API_URL;
  }
  
  // 2. Fallback: Si estamos en el cliente o no hay interna configurada
  // Asegúrate de que esta variable siempre esté definida en .env
  console.log('Usando NEXT_PUBLIC_BACKEND_URI para fetch en cliente o sin interna');
  return process.env.NEXT_PUBLIC_BACKEND_URI || '';
};    