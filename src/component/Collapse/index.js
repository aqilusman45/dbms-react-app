import React from "react";
import { Collapse, Button, Modal } from "antd";
const { Panel } = Collapse;

const Collapsible = ({
  downloadableContent,
  showModal,
  handleOk,
  visible,
  onCancel,
  countScore
}) => {
  return (
    <Collapse bordered={false}>
      {downloadableContent &&
        downloadableContent.map((item, index) => {
          if (item["content-type"] === "pdf") {
            return (
              <Panel header={item.title} key={item.title + index }>
                <div>
                  <h3>{item.content}</h3>
                  <p>{item.description}</p>
                  <p>Download PDF </p>
                  <a target="_blank" rel="noopener noreferrer" href={item.href}>
                    <Button
                    onClick={() => {
                      countScore(item.weightage, item.key.trim());
                    }}
                    type="primary" icon="download" size="large">
                      Download
                    </Button>
                  </a>
                </div>
              </Panel>
            );
          } else if (item["content-type"] === "video") {
            return (
              <Panel header={item.title} key={item.title + index}>
                <div>
                  <h3>{item.content}</h3>
                  <p>{item.description}</p>
                  <Button
                    type="primary"
                    onClick={() => {
                      showModal();
                      countScore(item.weightage, item.key) ;
                    }}
                  >
                    Watch Video
                  </Button>
                  <Modal
                    visible={visible}
                    centered={true}
                    className="teaser-vid-modal"
                    closable={false}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    onOk={handleOk}
                  >
                    <div
                      className="teaser-iframe"
                      dangerouslySetInnerHTML={{
                        __html: `${item.href}`
                      }}
                    />
                  </Modal>
                </div>
              </Panel>
            );
          }else {
            return null
          }
        })}
    </Collapse>
  );
};

export default Collapsible;
