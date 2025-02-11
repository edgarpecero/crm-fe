// import BarcodeReader from 'react-barcode-reader';

const ScanBarCode = ({
  onScan,
  onError,
}: {
  onScan: (data: string) => void;
  onError: (error: string) => void;
}) => {
  return (
    <>
      {/* <BarcodeReader onScan={onScan} onError={onError} /> */}
      <img width={300} height={300} src='./FigmaSvgVectors/ScanBarCode.svg' alt='Scan Bar Code' />
    </>
  );
};

export default ScanBarCode;
