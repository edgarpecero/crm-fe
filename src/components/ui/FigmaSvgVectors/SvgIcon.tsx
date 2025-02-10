export interface SVGProps {
  name: string;
  width?: number;
  height?: number;
}

const SvgIcon = ({
  name,
  width = 18,
  height = 18,
}: {
  name: string;
  width?: number;
  height?: number;
}) => <img width={width} height={height} src={`./FigmaSvgVectors/${name}.svg`} alt={name} />;

export default SvgIcon;
