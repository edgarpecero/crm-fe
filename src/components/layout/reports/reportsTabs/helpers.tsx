import ReportsEnterPage from '../reportsEnterPage/EnterPage';
import { NavigatorNode } from '@/components/ui/Navigator/Navigator';
import CashDrawerCheckout from '../reportsTables/cashDrawerCheckout/CashDrawerCheckout';

export enum ReportTabsEnum {
  all = 'Todos',
  customers = 'Clientes',
  purchasing = 'Compras',
  pos = 'Ventas',
  inventory = 'Inventorio',
  accountsReceivable = 'Recibos',
}

export const reportsTabsArray = Object.values(ReportTabsEnum).map((value) => ({
  label: value,
  value,
}));

export interface ReportOptionProps {
  label: string;
  type: ReportTabsEnum;
  permission?: string;
}
export const reportOptions: ReportOptionProps[] = [
  {
    label: 'Ventas por empleado',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Estado de cuenta',
    type: ReportTabsEnum.customers,
  },
  {
    label: 'Estado de Inventario',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Cierre de Caja',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Impuesto sobre Ventas',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Registro de Ventas',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Pagos y Descuentos',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Artículo Devuelto',
    type: ReportTabsEnum.pos,
  },
  {
    label: 'Ventas por Cliente',
    type: ReportTabsEnum.purchasing,
  },
  {
    label: 'Informe de Valoración',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Informe Mín/Máx',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Ventas por Categoría',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Hoja de Conteo por Lote',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Varianza de Conteo',
    type: ReportTabsEnum.inventory,
  },
  {
    label: 'Listado de Órdenes de Compra',
    type: ReportTabsEnum.purchasing,
  },
  {
    label: 'Registro de Aplicación de Pagos AR',
    type: ReportTabsEnum.accountsReceivable,
  },
  {
    label: 'Informe de Antigüedad de Cuentas por Cobrar',
    type: ReportTabsEnum.accountsReceivable,
  },
];

const amountOfAllColumns = 12;
const amountOfCurrentGridColumns = 5;
export const lg = amountOfAllColumns / amountOfCurrentGridColumns;

export enum ReportsNodeIndexEnum {
  enterPage = 0,
  stockStatus = 1,
  cashDrawerCheckout = 2,
  salesTax = 3,
  salesRegister = 4,
  paidOutAndDiscount = 5,
  returnedItem = 6,
  valuation = 7,
  minMax = 8,
  categorySales = 9,
  batchCountSheet = 10,
  countVariance = 11,
  purchaseOrderListing = 12,
  arPaymentPostingRegister = 13,
  arAgingReport = 14,
  customerSales = 15,
  customerPayments = 16,
  salesRep = 17,
}

export const node: NavigatorNode = {
  index: ReportsNodeIndexEnum.enterPage,
  label: 'Reportes',
  element: <ReportsEnterPage />,
  children: [
    {
      label: 'Ventas por empleado',
      index: ReportsNodeIndexEnum.salesRep,
      element: <CashDrawerCheckout />,
    },
    {
      index: ReportsNodeIndexEnum.customerPayments,
      label: 'Estado de cuenta',
    },
    {
      index: ReportsNodeIndexEnum.stockStatus,
      label: 'Estado de Inventario',
    },
    {
      index: ReportsNodeIndexEnum.cashDrawerCheckout,
      label: 'Cierre de Caja',
    },
    {
      index: ReportsNodeIndexEnum.salesTax,
      label: 'Impuesto sobre Ventas',
      // element: <SalesRegister />
    },
    {
      index: ReportsNodeIndexEnum.salesRegister,
      label: 'Registro de Ventas',
    },
    {
      index: ReportsNodeIndexEnum.paidOutAndDiscount,
      label: 'Pagos y Descuentos',
    },
    {
      index: ReportsNodeIndexEnum.returnedItem,
      label: 'Artículo Devuelto',
    },
    {
      index: ReportsNodeIndexEnum.valuation,
      label: 'Informe de Valoración',
    },
    {
      index: ReportsNodeIndexEnum.minMax,
      label: 'Informe Mín/Máx',
    },
    {
      index: ReportsNodeIndexEnum.categorySales,
      label: 'Ventas por Categoría',
    },
    {
      index: ReportsNodeIndexEnum.batchCountSheet,
      label: 'Hoja de Conteo por Lote',
    },
    {
      index: ReportsNodeIndexEnum.countVariance,
      label: 'Varianza de Conteo',
    },
    {
      index: ReportsNodeIndexEnum.purchaseOrderListing,
      label: 'Listado de Órdenes de Compra',
    },
    {
      index: ReportsNodeIndexEnum.arPaymentPostingRegister,
      label: 'Registro de Aplicación de Pagos AR',
    },
    {
      index: ReportsNodeIndexEnum.arAgingReport,
      label: 'Informe de Antigüedad de Cuentas por Cobrar',
    },
    {
      index: ReportsNodeIndexEnum.customerSales,
      label: 'Ventas por Cliente',
    },
  ],
};
