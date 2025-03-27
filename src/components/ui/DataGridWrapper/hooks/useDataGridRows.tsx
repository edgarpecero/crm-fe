'use client';
import { useMemo } from 'react';
import { BaseEntity } from '@/types/BaseEntity';

// Define the props interface with proper generic type
interface UseDataGridRowsParams<T extends BaseEntity> {
  rows: T[];
}

// Define the enhanced row type

interface EnhancedRow extends BaseEntity {
  tableIndex: number;
}

function useDataGridRows<T extends BaseEntity>({
  rows = [],
}: UseDataGridRowsParams<T>): EnhancedRow[] {
  // Use useMemo instead of useEffect for transforming data
  const enhancedRows = useMemo(() => {
    return rows.map((item, index) => ({
      tableIndex: index + 1,
      ...item,
    })) as EnhancedRow[];
  }, [rows]);

  return enhancedRows;
}

export default useDataGridRows;
