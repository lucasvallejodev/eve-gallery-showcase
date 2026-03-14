import { useEffect, useState } from "react";
import {
  fetchPaintings,
  fetchCategories,
  type ContentfulPainting,
  type ContentfulCategory,
} from "@/lib/contentful";

export function usePaintings() {
  const [paintings, setPaintings] = useState<ContentfulPainting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPaintings()
      .then(setPaintings)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { paintings, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<ContentfulCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
