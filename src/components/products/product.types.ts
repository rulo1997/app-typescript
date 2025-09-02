export type PaginationOptions = {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
}

export type ProductFilters = {
    minPrice: number;
    maxPrice: number;
}