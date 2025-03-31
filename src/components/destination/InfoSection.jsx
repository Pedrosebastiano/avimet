import React from "react";
import DescriptionCard from "./DescriptionCard";
import GuideCard from "./GuideCard";
import "./Destination.css";
import InputBG from "../../components/commentSection/InputBG";
import CommentBox from "../../components/commentSection/CommentBox";

export default function InfoSection({
  description,
  descriptionTitle,
  descriptionImage,
  guide,
  guideDescription,
  guideImage,
}) {
  return (
    <div className="info-section">
      <DescriptionCard
        image={descriptionImage}
        description={description}
        title={descriptionTitle}
      />
      <GuideCard
        image={guideImage}
        guide={guide}
        description={guideDescription}
        dest={descriptionTitle}
      />
      <div className='comments-section'>
        <InputBG destino={descriptionTitle}/>
        <CommentBox destino={descriptionTitle}/>
      </div>
    </div>
  );
}