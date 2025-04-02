'use client';

import React from 'react';
import { dateFormatter, formatToPrice } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { ListInventoryResponse, Inventory } from '@/types/inventory';
import { GridColDef } from '@mui/x-data-grid';
import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
import { inventoryService } from '@/services/inventoryService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useQueryData } from '@/hooks/useQueryData';
import { PageActionsEnum } from '@/types/enums';
import { deleteInventoryAction } from '@/services/actions/inventoryActions';
import InventoryDetailsContent from './details/InventoryDetailsContent';

function InventoryTable({ initialData }: { initialData: ListInventoryResponse }) {
  const gridMethods = useQueryData<ListInventoryResponse>({
    queryKey: QueryKeysEnum.INVENTORY,
    fetchFn: () => inventoryService.getAll(),
    initialData,
  });
  const { data, ..._pageProps } = gridMethods;

  const pageProps = { ..._pageProps };
  const dataGridHeaderProps = {
    buttonProps: { text: 'Ingresar nuevo auto', href: 'inventario/crear' },
    // handleSearch: () => { },
  };
  const dataGridProps = {
    columns: _columns,
    rows: data?.items || [],
    toolbar: true,
    initialState: {
      columns: {
        columnVisibilityModel: {},
      },
    },
    actionButtonsProps: {
      modalProps: {
        body: <InventoryDetailsContent mode={PageActionsEnum.MODALREADONLY} />,
      },
      onDeleteCb: async (inventory: Inventory) => {
        const response = await deleteInventoryAction(inventory.id);
        if (response.success) {
          alert(response.message);
          gridMethods.refetch();
        } else {
          alert(response.message);
        }
      },
    },
  };

  return (
    <DataGridLayout<Inventory>
      pageProps={pageProps}
      dataGridProps={dataGridProps}
      dataGridHeaderProps={dataGridHeaderProps}
    />
  );
}

export default React.memo(InventoryTable);

const _columns: GridColDef<Inventory>[] = [
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (props) => <ChipCell {...props} />,
  },
  {
    field: 'number',
    headerName: 'Número',
    flex: 1,
  },
  {
    field: 'sku',
    headerName: 'SKU',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Precio',
    valueFormatter: (value) => formatToPrice(value),
    flex: 1,
  },
  {
    field: 'quantityStock',
    headerName: 'Cantidad en Stock',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Tipo',
    flex: 1,
  },
  {
    field: 'vendor',
    headerName: 'Vendedor',
    flex: 1,
  },
  {
    field: 'manufacturer',
    headerName: 'Fabricante',
    flex: 1,
  },
  {
    field: 'model',
    headerName: 'Modelo',
    flex: 1,
  },
  {
    field: 'year',
    headerName: 'Año',
    flex: 1,
  },
  {
    field: 'vin',
    headerName: 'VIN',
    flex: 1,
  },
  {
    field: 'fuelType',
    headerName: 'Tipo de Combustible',
    flex: 1,
  },
  {
    field: 'kilometers',
    headerName: 'Kilometraje',
    flex: 1,
  },
  {
    field: 'color',
    headerName: 'Color',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Creado',
    valueFormatter: (value) => dateFormatter(value),
    flex: 1,
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Última Modificación',
    valueFormatter: (value) => dateFormatter(value),
    flex: 1,
  },
  {
    field: 'lastModifiedBy',
    headerName: 'Modificado Por',
    flex: 1,
  },
];
