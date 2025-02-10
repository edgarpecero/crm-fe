import { SVGProps } from './SvgIcon';

const FileCheckedIcon = ({ height = 20, width = 20 }: Pick<SVGProps, 'height' | 'width'>) => {
  return (
    <img width={width} height={height} src='./FigmaSvgVectors/FileCheckedIcon.svg' alt='File' />
  );
};

export default FileCheckedIcon;
