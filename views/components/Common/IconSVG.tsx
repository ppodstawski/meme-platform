import React from 'react';

type TIconSVG = {
  src: string;
  alt: string;
};

const IconSVG: React.FC<TIconSVG> = (props) => {
  return (
    <i className="iconSVG">
      <img src={'/icons/' + props.src + '.svg'} alt={props.alt} />
    </i>
  );
};

export default IconSVG;
