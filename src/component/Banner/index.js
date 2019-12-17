import React from "react";
import { Carousel, PageHeader, Icon } from "antd";

const BackIcon = ({ icon , title , color }) => (
  <div className="back-icon-container ant-page-header-heading">
    <span style={{color: color}} className="back-icon-title ant-page-header-heading-title">
      <Icon className="back-icon-banner" type={icon || ""} />
      {title || ""}
    </span>
  </div>
);

export const Banner = ({ images, title, subtitle, icon, color }) => (
  <>
    <Carousel>
      {images &&
        images.map((item, index) => {
          return (
            <div key={index++}>
              <img
                style={{ width: "100%" }}
                src={item.url}
                alt={item.title}
                title={item.title}
              />
            </div>
          );
        })}
    </Carousel>
    <PageHeader
      style={{ backgroundColor: color, boxShadow: "0px 1px 10px grey" }}
      title={<BackIcon icon={icon} color="white" title={title} />}
      className="page-header"
      subTitle={subtitle || ""}
    />
  </>
);

export default Banner;
