import React from "react";

interface Props {
  styles?: Styles;
  imgUrl: string;
  className?: string;
  information: string;
}

interface Styles {
  length: number;
  width: number;
}

const Image: React.FunctionComponent<Props> = ({
  styles,
  imgUrl,
  className,
  information,
}: Props) => {
  return (
    <img src={imgUrl} style={styles} className={className} alt={information} />
  );
};

export default Image;
