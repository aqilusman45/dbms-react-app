import React, { Component } from 'react';
import { Modal, Progress, Button, Icon, Tabs } from 'antd';
import { withFirebase } from "../Firebase";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { LogoActions } from "../../store/actions/logos";
import { connect } from "react-redux";
import ImageGallery from '../Image_Gallery';
var mime = require('mime-types')
const { TabPane } = Tabs;

class AddLogoImageBase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUploading: false,
            progress: 0,
            fileType: '',
            fileTitle: '',
            error: '',
            files: null,
            fileUrl: '',
            fileName: '',
            visible: false,
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    setFileType = (e) => {
        this.setState({
            fileType: e.target.value
        })
    }

    handleUploadStart = () => {
        this.setState({ isUploading: true, progress: 0 });
    }

    handleProgress = progress => this.setState({ progress });


    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };


    handleUploadSuccess = filename => {
        let filetype = mime.contentType(filename).split('/')
        this.props.firebase.setFileUrl({
            type: filetype[0],
            filename: filename,
        })
            .then(() => {
                setTimeout(() => {
                    this.setState({ progress: 0 });
                }, 1500);
            })
            .catch((rej) => {
                console.log(rej);
                this.setState({
                    error: {
                        message: 'file not uploaded'
                    },
                    isUploading: false
                })
            })
    };

    getFiles = () => {
        let filesHolder = []
        let itemProcessed = 0
        this.props.firebase.getAllFiles()
            .then((data) => {
                if (!data.empty) {
                    data.docs.forEach((item, index, array) => {
                        this.props.firebase.getDownloadUrl('files', `${item.data().filename}`)
                            .then((url) => {
                                filesHolder.push({
                                    url: url,
                                    type: item.data().type,
                                    filename: item.data().filename,
                                });
                                itemProcessed++;
                                if (itemProcessed === array.length) {
                                    this.setState({
                                        files: filesHolder
                                    })
                                }
                            })
                    });
                }
            })
    }

    componentWillMount() {
        this.getFiles()
        this.unsubscribe = this.props.firebase.getLiveGallery().onSnapshot(() => {
            this.getFiles();
        })
        if (!this.props.editMode) {
            this.props.removeLogo();
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
        if (!this.props.editMode) {
            this.props.removeLogo();
        }
    }

    componentWillUpdate(nextProps) {
    }



    onChangeTitle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setFileInfo = (url, name) => {
        this.setState({
            fileUrl: url,
            fileName: name
        })
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus" /> Add Logo
                                            </Button>
                <Modal
                    title="File Management"
                    width="70%"
                    style={{ top: 10 }}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <CustomUploadButton
                            storageRef={this.props.firebase.uploadFiles('files')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4 }}
                        >
                            Select file to upload
                    </CustomUploadButton>
                        <div style={{ margin: "10px 0" }}>
                            {<Progress percent={this.state.progress} />}
                        </div>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>


                    <Tabs>
                        <TabPane tab="Images" key="1">
                            <div className="gallery">
                                <ImageGallery setFileInfo={this.setFileInfo} addBanner={this.props.add} files={this.state.files} />
                            </div>
                        </TabPane>
                    </Tabs>
                    <div className="file-info-feilds">
                        <div>
                            {
                                Object.values(this.props.logo).length !== 0 ? (
                                    <div className="banner-image-list" key={this.props.logo.image}>
                                        <div>
                                            <img src={this.props.logo.url} />
                                        </div>
                                        <a onClick={() => this.props.removeLogo()}>remove</a>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logo: state.LogoReducers.logo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (image) => dispatch(LogoActions.addLogo(image)),
        removeLogo: (index) => dispatch(LogoActions.clearLogo(index))
    }
}

const AddLogoImage = connect(mapStateToProps, mapDispatchToProps)(withFirebase(AddLogoImageBase));

export default AddLogoImage;
