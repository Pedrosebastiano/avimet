import React from "react";

const IconSvg = ({ content }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default IconSvg;