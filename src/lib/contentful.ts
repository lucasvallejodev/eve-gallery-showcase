// Contentful Content Delivery API client (client-side, VITE_ env vars)

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    file: {
      url: string;
      contentType: string;
      details: { image?: { width: number; height: number } };
    };
  };
}

export interface ContentfulCategory {
  sys: { id: string };
  fields: {
    nombre: string;
    descripcion?: string;
  };
}

export interface ContentfulPainting {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    titulo: string;
    descripcion?: unknown; // RichText Document
    categoria?: ContentfulCategory;
    imagenes?: ContentfulAsset[];
    linkDeContacto?: string;
  };
}

interface ContentfulResponse<T> {
  items: T[];
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: unknown[];
  };
  total: number;
}

async function contentfulFetch<T>(
  contentType: string,
  params: Record<string, string> = {}
): Promise<ContentfulResponse<T>> {
  const url = new URL(`${BASE_URL}/entries`);
  url.searchParams.set("content_type", contentType);
  url.searchParams.set("access_token", ACCESS_TOKEN);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Contentful API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function resolveAssets(
  rawItems: ContentfulResponse<ContentfulPainting>
): ContentfulPainting[] {
  const assetMap = new Map<string, ContentfulAsset>();
  rawItems.includes?.Asset?.forEach((a) => assetMap.set(a.sys.id, a));

  const entryMap = new Map<string, ContentfulCategory>();
  (rawItems.includes?.Entry as ContentfulCategory[] | undefined)?.forEach((e) =>
    entryMap.set(e.sys.id, e)
  );

  return rawItems.items.map((item) => {
    const resolvedImages: ContentfulAsset[] = [];
    const rawImages = item.fields.imagenes as unknown as Array<{
      sys: { id: string };
    }> | undefined;
    rawImages?.forEach((imgRef) => {
      const asset = assetMap.get(imgRef.sys.id);
      if (asset) resolvedImages.push(asset);
    });

    // Resolve categoria
    const catRef = item.fields.categoria as unknown as { sys: { id: string } } | undefined;
    const resolvedCat = catRef ? entryMap.get(catRef.sys.id) : undefined;

    return {
      ...item,
      fields: {
        ...item.fields,
        imagenes: resolvedImages,
        categoria: resolvedCat ?? item.fields.categoria,
      },
    };
  });
}

export async function fetchPaintings(): Promise<ContentfulPainting[]> {
  const data = await contentfulFetch<ContentfulPainting>("pinturas", {
    include: "2",
    order: "-sys.createdAt",
  });
  return resolveAssets(data);
}

export async function fetchCategories(): Promise<ContentfulCategory[]> {
  const data = await contentfulFetch<ContentfulCategory>("categorias");
  return data.items;
}

/** Prepend https: if URL starts with // */
export function assetUrl(url: string): string {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}
