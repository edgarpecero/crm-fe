import Image from 'next/image';

const DeleteIcon = () => {
  return (
    <Image
      width={26}
      height={19}
      style={{ margin: '0 0 0 -2px' }}
      src='./FigmaSvgVectors/DeleteIcon.svg'
      alt='Delete char'
    />
  );
};

export default DeleteIcon;
