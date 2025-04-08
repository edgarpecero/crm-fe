'use client';
import { OpenModalParams, useModal } from '@/context/GlobalModalContext/GlobalModalContext';
import { GridColDef, GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SimpleActionsCell from '@/components/ui/DataGridCellComponents/SimpleActionsCell';

export interface DataGridActionButtonsProps<T> {
  modalProps?: OpenModalParams;
  onDeleteCb?: (row: T) => void;
  deleteAction?: boolean;
  onEditCb?: (row: T) => void;
  editAction?: boolean;
  onViewCb?: (row: T) => void;
  viewAction?: boolean;
}
interface UseDataGridColsParams<T extends GridValidRowModel> {
  cols: GridColDef<T>[];
  actionButtonsProps?: DataGridActionButtonsProps<T>;
}

function useDataGridCols<T extends GridValidRowModel>({
  cols = [],
  actionButtonsProps,
}: UseDataGridColsParams<T>): GridColDef<T>[] {
  const {
    modalProps,
    onDeleteCb,
    onEditCb,
    onViewCb,
    deleteAction = false,
    editAction = false,
    viewAction = true,
  } = actionButtonsProps || {};
  const hasActionButtons = Boolean(
    actionButtonsProps &&
      Object.keys(actionButtonsProps).some(
        (key) => actionButtonsProps[key as keyof DataGridActionButtonsProps<T>] !== undefined,
      ),
  );
  const { openModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const renderActionsCell = useCallback(
    (params: GridRenderCellParams) => {
      const rowId = params.row.id;
      const onDelete = () => {
        if (onDeleteCb) {
          onDeleteCb(params.row);
        }
      };

      const onEdit = () => {
        if (onEditCb) {
          onEditCb(params.row);
        }
        router.push(`${pathname}/${rowId}`);
      };

      const onView = async () => {
        if (onViewCb) {
          onViewCb(params.row);
        }
        if (modalProps?.body) {
          const props = {
            ...modalProps,
            initialData: params.row,
          };
          openModal(props);
        }
      };

      return (
        <SimpleActionsCell
          onDelete={deleteAction ? onDelete : undefined}
          onEdit={editAction ? onEdit : undefined}
          onView={viewAction ? onView : undefined}
        />
      );
    },
    [
      deleteAction,
      editAction,
      viewAction,
      modalProps,
      onDeleteCb,
      onEditCb,
      onViewCb,
      openModal,
      router,
      pathname,
    ],
  );

  const columns: GridColDef<T>[] = useMemo(() => {
    const baseColumns = [
      {
        field: 'tableIndex',
        headerName: '#',
        hide: true,
        width: 60,
      },
      ...cols,
    ];

    if (hasActionButtons) {
      baseColumns.push({
        field: 'actions',
        headerName: 'Acciones',
        width: viewAction && editAction ? 150 : 80,
        renderCell: renderActionsCell,
      });
    }

    return baseColumns;
  }, [cols, hasActionButtons, renderActionsCell, viewAction, editAction]);

  return columns;
}

export default useDataGridCols;
