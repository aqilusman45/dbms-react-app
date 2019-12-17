import React from 'react';
import { Empty } from 'antd';
import fileImage from '../../assets/images/file.png'


const FilesGallery = ({ files, setFileInfo }) => {
    return (
        files !== null ? files.map(item => {
            if (item.type !== 'image') {
                return (
                    <div onClick={(e) => setFileInfo(item.url, item.filename)} key={item.url} className="container">
                        <img src={fileImage} className="image" />
                        <div className="overlay">
                            <div className="text">{item.filename}</div>
                        </div>
                    </div>
                )
            }
        }) : <Empty />
    )
}

export default FilesGallery;