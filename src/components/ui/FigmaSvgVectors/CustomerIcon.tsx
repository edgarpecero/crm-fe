import SvgIcon, { SVGProps } from './SvgIcon';

const CustomerIcon = ({ width, height }: Pick<SVGProps, 'height' | 'width'>) => {
  return <SvgIcon width={width || 17} height={height || 20} name='CustomerIcon' />;
};

export default CustomerIcon;
