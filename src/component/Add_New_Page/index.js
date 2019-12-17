import React from 'react';
import { Drawer, Col, Row, Input, Select, Button, Icon, Modal } from 'antd';
import FileManager from '../File_Management';
import { BannerActions } from "../../store/actions/banner";
import { connect } from "react-redux";
import AddBannerImage from '../Add_Banner';
import AddFiles from '../Add_File';
const { Option } = Select;


class AddNewPageBase extends React.Component {
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

    setFileInfo = (url, name) => {
        this.setState({
            fileUrl: url,
            fileName: name
        }, () => {
            this.props.setFile(url, name)
        })
    }

    componentWillMount() {
        this.props.clear();
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {
        const state = this.props.state;
        const downloadablesDisabled = state.downloadableContent === '' ||
            state.downloadableContentType === '' ||
            state.downloadableHref === '' ||
            state.downloadableWeightage === '';
        return (
            <div>
                <div className="create-new-page-button">
                    <Button type="primary" onClick={this.props.showDrawer}>
                        <Icon type="plus" /> Create New Page
                    </Button>
                </div>
                <Drawer
                    title={state.editMode ? 'Edit Page' : 'Create New Page'}
                    className="create-new-page-drawer"
                    width={720}
                    destroyOnClose={true}
                    onClose={this.onClose}
                    closable={false}
                    visible={this.props.visible}
                >
                    <div className="create-new-page-form-wrapper">
                        <form className="create-new-page-form" layout="vertical">
                            <fieldset>
                                <legend>Page Info</legend>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Enter page title
                                    <Input required={true} disabled={state.editMode ? true : false} onChange={this.props.onChange} name="pageText" value={state.pageText} placeholder="Page title" />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            URL
                                    <Input
                                                style={{ width: '100%' }}
                                                name="pageLink"
                                                value={state.pageLink}
                                                disabled
                                                pattern="^(?:\d+(?:-\d+)?(?:,|$))+$"
                                                title="No spaces allowed for url"
                                                placeholder="Auto-genereted URL"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Select Page Icon
                                    <Select required={true} onChange={this.props.handIconSelect} value={state.pageIcon} placeholder="Please select an owner">
                                                <Option value="reconciliation"><Icon type="reconciliation" /> reconciliation</Option>
                                                <Option value="pay-circle"><Icon type="pay-circle" /> pay-circle</Option>
                                                <Option value="gift"><Icon type="gift" /> gift</Option>
                                                <Option value="folder-add"><Icon type="folder-add" /> folder-add</Option>
                                                <Option value="database"><Icon type="database" /> database</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Side Menu Link Position
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="pagePosition"
                                                type="number"
                                                onChange={this.props.onChange}
                                                value={state.pagePosition}
                                                placeholder="Please Enter Side Menu Position"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Page Header Color
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="headerColor"
                                                type="text"
                                                onChange={this.props.onChange}
                                                value={state.headerColor}
                                                placeholder="Please Enter Color Hex Code"
                                            />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Page Header Subtitle
                                    <Input
                                                style={{ width: '100%' }}
                                                name="headerSub"
                                                type="text"
                                                onChange={this.props.onChange}
                                                value={state.headerSub}
                                                placeholder="Please Enter Header Subtitle"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <fieldset>
                                            <legend>Manage Files</legend>
                                            <FileManager />
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <h4>Banner Images</h4>
                                            {
                                                this.props.banners && this.props.banners.map((item, index) => {
                                                    return (
                                                        <div className="banner-image-list" key={item.image + index}>
                                                            <img src={item.url} />
                                                            <a onClick={() => this.props.removeBanner({
                                                                index: index
                                                            })}>remove</a>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <AddBannerImage editMode={state.editMode} />
                                </Row>
                            </fieldset>
                            <fieldset>
                                <legend>Page Content</legend>
                                <Row gutter={16}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <h4>Downloadable Content</h4>
                                            <ul>
                                                {state.downloadables &&
                                                    state.downloadables.map((item, index) => {
                                                        return (
                                                            <li key={item.title + index}>
                                                                <h6>
                                                                    {item.title}
                                                                </h6>
                                                                <a onClick={() => this.props.removeDownloadables(index)} >remove</a> / <a onClick={() => this.props.editDownloadableContent(index)}>Edit</a>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Col span={12}>
                                        <label>
                                            Downloadable Content Title
                                            <Input
                                                style={{ width: '100%' }}
                                                name="downloadableTitle"
                                                type="text"
                                                onChange={this.props.onChange}
                                                value={state.downloadableTitle}
                                                placeholder="Please Enter Downloadable Content Title"
                                            />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Content
                                            <Input
                                                style={{ width: '100%' }}
                                                name="downloadableContent"
                                                type="text"
                                                onChange={this.props.onChange}
                                                value={state.downloadableContent}
                                                placeholder="Please Enter Content"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Select Content Type
                                    <Select onChange={this.props.handContentType} value={state.downloadableContentType} placeholder="Please select content type">
                                                <Option value="pdf"> Other Files</Option>
                                                <Option value="video"> Video</Option>
                                            </Select>
                                        </label>
                                        <AddFiles state={this.state} setFileInfo={this.setFileInfo} />
                                    </Col>
                                    <Col span={12}>
                                        {
                                            state.downloadableContentType === 'pdf' ? (
                                                <label>
                                                    File Name
                                            <Input
                                                        style={{ width: '100%' }}
                                                        name="downloadableHref"
                                                        type="text"
                                                        disabled={true}
                                                        value={state.downloadableHrefName}
                                                        placeholder="Please select a file"
                                                    />
                                                </label>
                                            ) : (
                                                    <label>
                                                        Video Embed Code
                                            <Input
                                                            style={{ width: '100%' }}
                                                            name="downloadableHref"
                                                            type="text"
                                                            onChange={this.props.onChange}
                                                            value={state.downloadableHref}
                                                            placeholder="Please Enter Code for Embed"
                                                        />
                                                    </label>
                                                )
                                        }
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <label>
                                            Weightage
                                            <Input
                                                style={{ width: '100%' }}
                                                name="downloadableWeightage"
                                                type="number"
                                                onChange={this.props.onChange}
                                                value={state.downloadableWeightage}
                                                placeholder="Please Enter Weightage for this download"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <label>
                                            Description
                                        <Input.TextArea rows={4}
                                                style={{ width: '100%' }}
                                                name="downloadableDescription"
                                                type="text"
                                                onChange={this.props.onChange}
                                                value={state.downloadableDescription}
                                                placeholder="Please Page Description"
                                            />
                                        </label>
                                    </Col>
                                    <div style={{ marginRight: 8, marginBottom: 50 }}>  {
                                        state.editDCIndex !== '' ? (
                                            <div>
                                                <Button disabled={downloadablesDisabled} onClick={() => this.props.addEditedDownloadableContent(state.editDCIndex)} style={{ marginRight: 8 }}>
                                                    Update
             </Button>
                                                <Button onClick={() => this.props.cancelEditedDownloadableContent()} style={{ marginRight: 8 }}>
                                                    Cancel
             </Button>
                                            </div>
                                        ) : (
                                                <Button disabled={downloadablesDisabled} onClick={this.props.addContent}>
                                                    Add
              </Button>
                                            )
                                    }</div>
                                </Row>
                            </fieldset>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: '100%',
                                    borderTop: '1px solid #e9e9e9',
                                    padding: '10px 16px',
                                    background: '#fff',
                                    textAlign: 'right',
                                }}
                            >
                                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                                    Cancel
              </Button>
                                {
                                    (<Button onClick={this.props.handleSubmit} type="primary">
                                        {state.editMode ? 'Update' : 'Submit'}
                                    </Button>)
                                }
                            </div>
                        </form>
                    </div>
                </Drawer>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        banners: state.BannerReducers.banners
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (image) => dispatch(BannerActions.addBanners(image)),
        clear: () => dispatch(BannerActions.clearBanners()),
        removeBanner: (index) => dispatch(BannerActions.removeBanner(index))
    }
}

const AddNewPage = connect(mapStateToProps, mapDispatchToProps)(AddNewPageBase)

export default AddNewPage;