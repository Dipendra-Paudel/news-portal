import React from "react";
import parse from "html-react-parser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { LinkButton } from "./button";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CategoryNewsCard = ({ image, title, content, createdAt, _id }) => {
  content = content.length > 150 ? `${content.slice(0, 150)}...` : content;

  const date = new Date(createdAt);
  const day = date.getDate();
  const month = date.toLocaleDateString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="flex-1 md:flex md:space-x-5">
      <div className="flex-1">
        <img
          src={`${baseUrl}${image}`}
          alt={title}
          className="w-full h-56 object-cover object-left-top"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-700 flex items-center space-x-1 pt-2">
          <AccessTimeIcon style={{ fontSize: "20px" }} />
          <div>{`${month} ${day}, ${year}`}</div>
        </div>

        <div className="heading-1">{title}</div>
        <div className="text-sm text-gray-600">{parse(content)}</div>
        <div className="pt-4 md:pt-8">
          <LinkButton label="Read More" url={`/news/${_id}`} />
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsCard;
