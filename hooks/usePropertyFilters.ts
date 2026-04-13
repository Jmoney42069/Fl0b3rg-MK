"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {
  Property,
  PropertyFilters,
  PropertyType,
  PropertyRegion,
  PriceRange,
  SortOption,
} from "@/types/property";

/* ── Default filters ─────────────────────────────────────────── */
export const DEFAULT_FILTERS: PropertyFilters = {
  priceRange: "all",
  types: [],
  region: "all",
  minBedrooms: null,
  sort: "newest",
};

/* ── Price range helper ──────────────────────────────────────── */
function matchesPrice(price: number, range: PriceRange): boolean {
  switch (range) {
    case "to-400":
      return price < 400000;
    case "400-600":
      return price >= 400000 && price < 600000;
    case "600-800":
      return price >= 600000 && price < 800000;
    case "800-1000":
      return price >= 800000 && price < 1000000;
    case "above-1000":
      return price >= 1000000;
    default:
      return true;
  }
}

/* ── Sort helper ─────────────────────────────────────────────── */
function sortProperties(props: Property[], sort: SortOption): Property[] {
  const copy = [...props];
  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      );
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "surface-desc":
      return copy.sort((a, b) => b.surfaceArea - a.surfaceArea);
    default:
      return copy;
  }
}

/* ── Parse filters from URL search params ────────────────────── */
export function parseFiltersFromParams(
  searchParams: URLSearchParams
): PropertyFilters {
  const priceRange =
    (searchParams.get("prijs") as PriceRange) ?? DEFAULT_FILTERS.priceRange;
  const typesRaw = searchParams.get("type");
  const types: PropertyType[] = typesRaw
    ? (typesRaw.split(",") as PropertyType[])
    : [];
  const region =
    (searchParams.get("regio") as PropertyRegion | "all") ?? DEFAULT_FILTERS.region;
  const minBedroomsRaw = searchParams.get("kamers");
  const minBedrooms = minBedroomsRaw ? parseInt(minBedroomsRaw, 10) : null;
  const sort =
    (searchParams.get("sort") as SortOption) ?? DEFAULT_FILTERS.sort;

  return { priceRange, types, region, minBedrooms, sort };
}

/* ── Serialize filters to URL params ─────────────────────────── */
export function serializeFiltersToParams(
  filters: PropertyFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.priceRange !== "all") params.set("prijs", filters.priceRange);
  if (filters.types.length > 0) params.set("type", filters.types.join(","));
  if (filters.region !== "all") params.set("regio", filters.region);
  if (filters.minBedrooms !== null)
    params.set("kamers", String(filters.minBedrooms));
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  return params;
}

/* ── Count active filters ─────────────────────────────────────── */
export function countActiveFilters(filters: PropertyFilters): number {
  let count = 0;
  if (filters.priceRange !== "all") count++;
  if (filters.types.length > 0) count++;
  if (filters.region !== "all") count++;
  if (filters.minBedrooms !== null) count++;
  return count;
}

/* ── Main hook ────────────────────────────────────────────────── */
export function usePropertyFilters(properties: Property[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams]
  );

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (!matchesPrice(p.price, filters.priceRange)) return false;
      if (filters.types.length > 0 && !filters.types.includes(p.type))
        return false;
      if (filters.region !== "all" && p.address.region !== filters.region)
        return false;
      if (
        filters.minBedrooms !== null &&
        p.bedrooms < filters.minBedrooms
      )
        return false;
      return true;
    });
    return sortProperties(result, filters.sort);
  }, [properties, filters]);

  const setFilters = (newFilters: PropertyFilters) => {
    const params = serializeFiltersToParams(newFilters);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const updateFilter = <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K]
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const activeCount = countActiveFilters(filters);

  return {
    filters,
    filtered,
    setFilters,
    updateFilter,
    resetFilters,
    activeCount,
  };
}
