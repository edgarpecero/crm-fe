'use client';

import {
  bussinessFormulas,
  contractInputs,
  getCustomerAddressRequestInputs,
  getCustomerRequestInputs,
  termMonthOptions,
} from '../../helpers';
import { Box, Divider } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';
import CustomerFormBody from '@/components/features/customers/details/CustomerForm/CustomerFormBody';
import { useCallback, useEffect, useMemo } from 'react';
import { theme } from '@/styles/Theme';
import TwoColumnsLayout from '@/components/layout/GridLayouts/TwoColumnsLayout';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import ControlledSingleSelect from '@/components/ui/ControlledInputs/ControlledSingleSelect';
import { useFormContext } from 'react-hook-form';
import { QueryKeysEnum } from '@/services/config';
import { userService } from '@/services/userService';
import { useQueryData } from '@/hooks/useQueryData';
import { ListUsersResponse } from '@/types/users';
import { ListCustomersResponse } from '@/types/customers';
import { customerService } from '@/services/customerService';
import { buildUserFullname, getPersonaSelectOptions } from '@/helpers/utils';
import FileUploadButton from '@/components/ui/Buttons/FileUploadButton';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/orders';
import FileViewer from '@/components/ui/FileViewer/FileViewer';
type OrderFormBodyProps = {
  title?: string;
  mode: PageActionsEnum;
};
const { openingFee, monthlyPayment, excessAmount, paymentCount } = bussinessFormulas;
export default function OrderFormBody({ title, mode }: OrderFormBodyProps) {
  const isCreateMode = mode === PageActionsEnum.CREATE;
  const isModalMode = mode === PageActionsEnum.MODALREADONLY;
  const userDataQuery = useQueryData<ListUsersResponse>({
    queryKey: QueryKeysEnum.USERS,
    fetchFn: () => userService.getAll(),
    enable: isCreateMode,
  });
  const { data: userData } = userDataQuery;
  const customerDataQuery = useQueryData<ListCustomersResponse>({
    queryKey: QueryKeysEnum.CUSTOMERS,
    fetchFn: () => customerService.getAll(),
    enable: isCreateMode,
  });
  const { data: customerData } = customerDataQuery;

  const { control, watch, reset, setValue, getValues } = useFormContext();
  const orderInitialData = getValues() as Order;
  const userId = watch('userId');
  const termMonths = watch('termMonths');
  const customerId = watch('customerId');
  const totalAmount = watch('totalAmount');
  const initialPayment = watch('initialPayment');
  const uploadFileUrl = watch('uploadFileUrl');
  const downloadFileUrl = watch('downloadFileUrl');
  const employeeLeaderId = watch('employeeLeaderId');
  const employeeManagerId = watch('employeeManagerId');
  const users = useMemo(() => userData?.users || [], [userData]);
  const _mode = customerId ? mode : PageActionsEnum.READONLY;

  const getCustomerDetails = useCallback(async () => {
    try {
      const customer = await customerService.getById(customerId);
      if (customer) {
        reset({
          customerId: customer.id,
          customerName: customer.name + ' ' + customer.lastName,
          termMonths: termMonthOptions[0].value,
          createdAt: new Date(),
          location: 'Pachuca',
          customer: { ...customer, orderCount: customer?.orderCount || 0 },
        });
      }
    } catch {
      // enqueueSnackbar(genericErrorMessage, {
      //   variant: 'error',
      // });
    } finally {
      // setLoading(false);
    }
  }, [customerId, reset]);
  useEffect(() => {
    setValue('openingFee', openingFee(totalAmount));
    setValue('monthlyPayment', monthlyPayment(totalAmount, termMonths));
    setValue('excessAmount', excessAmount(totalAmount, initialPayment));
    setValue('paymentCount', paymentCount(totalAmount, termMonths, initialPayment));
  }, [totalAmount, termMonths, initialPayment, setValue]);
  useEffect(() => {
    if (customerId) {
      getCustomerDetails();
    }
  }, [customerId, getCustomerDetails]);
  useEffect(() => {
    const fields = [
      { id: userId, key: 'userName' },
      { id: employeeLeaderId, key: 'employeeLeader' },
      { id: employeeManagerId, key: 'employeeManager' },
    ];

    fields.forEach(({ id, key }) => {
      if (id) {
        setValue(key, buildUserFullname(users, id), { shouldValidate: true });
      }
    });
  }, [userId, employeeLeaderId, employeeManagerId, setValue, users]);

  const onUploadSuccess = useCallback(async () => {
    try {
      if (orderInitialData?.id) {
        const response = await orderService.saveFileMetadata(orderInitialData.id);
        if (response?.downloadUrl) {
          const { downloadUrl } = response;
          setValue('downloadFileUrl', downloadUrl, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
      }
    } catch (error) {
      console.error('Error al guardar los metadatos del archivo:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  }, [setValue, orderInitialData]);

  const onUploadError = useCallback((error: unknown) => {
    console.error('Error uploading file:', error);
  }, []);

  return (
    <>
      {title && <TitlePage title={title} />}
      {!customerId && isCreateMode ? (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Select or Create User */}
          <TwoColumnsLayout
            title1='Selecciona un Cliente'
            title2='Registra un nuevo Cliente'
            spacing={2}
            contentOne={
              <ControlledSingleSelect
                control={control}
                name='customerId'
                label='Cliente'
                items={getPersonaSelectOptions(customerData?.costumers || [])}
                placeholder='Selecciona un cliente'
                required={true}
                sx={{ width: '80%', height: '100%' }}
              />
            }
            contentTwo={
              <LinkButton
                text='Registrar'
                href='/clientes/crear?order=true'
                color='primary'
                size='large'
                sx={{ width: '80%', height: '100%' }}
              />
            }
          />
        </Box>
      ) : (
        <>
          {/* Create Order Form */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mt: 2,
              gap: 2,
            }}
          >
            <TwoColumnsGrid
              title1={isModalMode ? 'Datos del pago' : undefined}
              firstColInputs={contractInputs(_mode, users).slice(0, 9)}
              secondColInputs={contractInputs(_mode, users).slice(9)}
            />
            {uploadFileUrl && !downloadFileUrl && (
              <FileUploadButton
                presignedUrl={uploadFileUrl}
                onUploadSuccess={onUploadSuccess}
                onUploadError={onUploadError}
              />
            )}
            {downloadFileUrl && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end', // Alinea FileViewer a la derecha
                }}
              >
                <FileViewer presignedUrl={downloadFileUrl} text='Ver contrato' />
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 4, border: 3, color: theme.palette.primary.main }} />

          {isModalMode ? (
            <>
              <TwoColumnsGrid
                title1='Datos del solicitante'
                firstColInputs={getCustomerRequestInputs(
                  PageActionsEnum.MODALREADONLY,
                  'customer.',
                )}
                secondColInputs={getCustomerAddressRequestInputs(
                  PageActionsEnum.MODALREADONLY,
                  'customer.',
                )}
              />
            </>
          ) : (
            <>
              <CustomerFormBody
                mode={PageActionsEnum.READONLY}
                defaultExpanded={false}
                required={false}
                parentName='customer.'
              />
            </>
          )}

          {/* 
          {isCreateMode && (<Typography variant='h3' sx={{ p: '1.5rem 0', pl: 4 }}>
            DATOS DEL PAGO
          </Typography>)} */}
        </>
      )}
    </>
  );
}
