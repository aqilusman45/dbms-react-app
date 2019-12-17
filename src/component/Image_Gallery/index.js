import React from 'react';
import { Empty } from 'antd';


const ImageGallery = ({ files, setFileInfo, addBanner }) => {
    return (
        files !== null ? files.map(item => {
            if (item.type === 'image') {
                return (
                    <div onClick={(e) => {
                        setFileInfo(item.url, item.filename)
                        if (addBanner !== undefined) {
                            addBanner({
                                url: item.url,
                                fileName: item.filename
                            })
                        }
                    }} className="gallery-list-item" key={item.url} >
                        <div className="image-container">
                            <img key={item.url} width="100%" src={item.url} />
                        </div>
                    </div>
                )
            }
        }) : <Empty />
    )
}

export default ImageGallery;