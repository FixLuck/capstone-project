import { useSearchParams } from "react-router-dom";

import React from 'react'

export function useShopFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const updateFilter = (key, value) => {
        if (value) {
            searchParams.set(key, value)
        } else {
            searchParams.delete(key)
        }
        setSearchParams(searchParams)
    }

    const clearFilters = () => {
        setSearchParams({})
    }

    const getActiveFilters = () => {
        const filters = {}
        searchParams.forEach((value, key) => {
            filters[key] = value
        })
        return filters;
    }

    return {
        filters: getActiveFilters(),
        updateFilter,
        clearFilters,
        searchParams
    }
}
