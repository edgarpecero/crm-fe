import { Button, CircularProgress } from '@mui/material';
import { useDynamicTabs } from '../../../../hooks/UseDynamicTabs';
import { usePrintReports } from '../../../../hooks/requests/useReports/usePrintReports';
import { ReportsNodeIndexEnum } from '../../reportsTabs/helpers';
import { useState } from 'react';
import PDFViewer from '../../../../components/PDFViewer/PDFViewer';

interface PrintButtonProps {
  nodeIndex: ReportsNodeIndexEnum;
}

const PrintButton = ({ nodeIndex }: PrintButtonProps) => {
  const { newTab } = useDynamicTabs();
  const { printFilters, getPDFBlob } = usePrintReports();
  const [loading, setLoading] = useState(false);

  const onPrint = async () => {
    setLoading(true);
    const url = await getPDFBlob(nodeIndex, printFilters[nodeIndex]);
    setLoading(false);
    if (url)
      newTab({
        label: `Report: ${Date.now()}`,
        element: <PDFViewer url={url} />,
      });
  };

  return (
    <Button
      color={'primary'}
      type='button'
      onClick={onPrint}
      sx={{ width: '75px' }}
      disabled={loading || !printFilters[nodeIndex]}
    >
      {loading ? <CircularProgress size={20} /> : 'Print'}
    </Button>
  );
};

export default PrintButton;
