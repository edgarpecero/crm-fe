import Image from 'next/image';
import { SVGProps } from './SvgIcon';

const FileCheckedIcon = ({ height = 20, width = 20 }: Pick<SVGProps, 'height' | 'width'>) => {
  return (
    <Image width={width} height={height} src='./FigmaSvgVectors/FileCheckedIcon.svg' alt='File' />
  );
};

export default FileCheckedIcon;
