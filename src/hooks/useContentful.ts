import { useEffect, useState } from "react";
import {
  fetchPaintings,
  fetchCategories,
  fetchInicio,
  fetchSobreMi,
  type ContentfulPainting,
  type ContentfulCategory,
  type ContentfulInicio,
  type ContentfulSobreMi,
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

export function useInicio() {
  const [data, setData] = useState<ContentfulInicio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInicio()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useSobreMi() {
  const [data, setData] = useState<ContentfulSobreMi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSobreMi()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

