'use client';

import { PageActionsEnum } from '@/types/enums';
import {
  getInventoryInputsForInventoryRequestColOne,
  getInventoryInputsForInventoryRequestColTwo,
} from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';

type InventoryFormBodyProps = {
  title?: string;
  mode: PageActionsEnum;
};

export default function InventoryFormBody({ title, mode }: InventoryFormBodyProps) {
  return (
    <>
      <TitlePage title={title} />

      <TwoColumnsGrid
        title1='Registro'
        firstColInputs={getInventoryInputsForInventoryRequestColOne(mode)}
        secondColInputs={getInventoryInputsForInventoryRequestColTwo(mode)}
      />
    </>
  );
}
