import React, { Component } from "react";
import { Row, Col, PageHeader, Icon, Modal } from "antd";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { ContentTable } from "../Content_Management_Table";
import { BannerActions } from "../../store/actions/banner";
import { connect } from "react-redux";
import AddNewPage from "../Add_New_Page";


const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);


const INITIAL_STATE = {
    pages: null,
    visible: false,
    editMode: false,
    visibleModal: false,
    editPageKey: '',
    editDCIndex: '',
    deletePageSlug: '',
    pageText: "",
    pageIcon: "gift",
    pageLink: "",
    pagePosition: "",
    headerColor: "#3e85c5",
    headerSub: "",
    totalScore: "",
    bannerImage: null,
    bannerImageTitle: '',
    bannerImageURL: '',
    downloadables: null,
    downloadableContent: "",
    downloadableContentType: "pdf",
    downloadableDescription: "",
    downloadableHref: "",
    downloadableHrefName: "",
    downloadableKey: "",
    downloadableTitle: "",
    downloadableWeightage: "",
    error: {},
};

class ContentManagementBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    slugify = (string) => {
        const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
        const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return string.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    }


    getPages = () => {
        let pagesHolder = [];
        let itemProcessed = 0;
        this.props.firebase.getMenuLinks(this.props.match.params.franchise)
            .then((data) => {
                data.docs.forEach((item, index, array) => {
                    pagesHolder.push({
                        key: item.data().link.text,
                        pageName: item.data().link.text,
                        totalScore: item.data()['total-score'],
                        link: item.data().link.link,
                        position: item.data().link.position + 1,
                    })
                    itemProcessed++;
                    if (itemProcessed === array.length) {
                        this.setPages(pagesHolder)
                    }
                });
            })
            .catch((rej) => {
                console.log(rej);
            })
    }

    setPages = (pages) => {
        let links = pages.sort(function (a, b) { return a.position - b.position })
        this.setState({
            pages: links
        })
    }

    addBannerImage = () => {
        const { bannerImageTitle, bannerImageURL, bannerImage } = this.state;
        if (bannerImage === null) {
            let bannerImageHolder = [];
            bannerImageHolder.push({
                image: bannerImageURL,
                title: bannerImageTitle
            })
            this.setState({
                bannerImage: bannerImageHolder
            }, () => {
                this.setState({
                    bannerImageURL: '',
                    bannerImageTitle: '',
                })
            })
        } else {
            bannerImage.push({
                image: bannerImageURL,
                title: bannerImageTitle
            })
            this.setState({
                bannerImage: bannerImage
            }, () => {
                this.setState({
                    bannerImageURL: '',
                    bannerImageTitle: '',
                })
            })
        }
    }

    addContent = () => {
        const { downloadables } = this.state;
        if (downloadables === null) {
            let downloadableContent = [];
            downloadableContent.push({
                content: this.state.downloadableContent,
                'content-type': this.state.downloadableContentType,
                description: this.state.downloadableDescription,
                href: this.state.downloadableHref === '' ? this.state.downloadableIframe : this.state.downloadableHref,
                key: this.slugify(this.state.downloadableTitle),
                weightage: parseInt(this.state.downloadableWeightage),
                title: this.state.downloadableTitle,
            })
            this.setState({
                downloadables: downloadableContent
            }, () => {
                this.setState({
                    downloadableContent: '',
                    downloadableContentType: '',
                    downloadableDescription: '',
                    downloadableTitle: '',
                    downloadableHref: '',
                    downloadableWeightage: '',
                })
            })
        } else {
            downloadables.push({
                content: this.state.downloadableContent,
                'content-type': this.state.downloadableContentType,
                description: this.state.downloadableDescription,
                href: this.state.downloadableHref === '' ? this.state.downloadableIframe : this.state.downloadableHref,
                key: this.slugify(this.state.downloadableTitle),
                weightage: parseInt(this.state.downloadableWeightage),
                title: this.state.downloadableTitle,
            })
            this.setState({
                downloadables: downloadables
            }, () => {
                this.setState({
                    downloadableContent: '',
                    downloadableContentType: '',
                    downloadableDescription: '',
                    downloadableTitle: '',
                    downloadableHref: '',
                    downloadableWeightage: '',
                })
            })
        }
    }

    removeBannerImage = (e) => {
        let { bannerImage } = this.state;
        bannerImage.splice(e, 1)
        this.setState({
            bannerImage: bannerImage
        })
    }

    removeDownloadables = e => {
        let { downloadables } = this.state;
        downloadables.splice(e, 1)
        this.setState({
            downloadables: downloadables
        })
    }

    componentWillMount() {
        this.getPages();
        this.unsbscribe = this.props.firebase.getLivePages().onSnapshot(() => {
            this.getPages();
        })
    }


    setError = (msg) => {
        this.setState({
            error: {
                message: msg
            }
        }, () => {
            this.error();
        })
    }


    error = () => {
        Modal.error({
            title: 'Something went wrong',
            content: this.state.error.message,
        });
    }

    handleSubmit = () => {
        if (this.state.pageText === undefined || this.state.pageText === '') {
            this.setError('Please add page title');
        } else if (this.state.pagePosition === undefined || this.state.pagePosition === '') {
            this.setError('Please add side menu position.');
        } else if (this.state.headerSub === undefined || this.state.headerSub === '') {
            this.setError('Please add header subtitle.');
        } else {
            let totalScore = 0;
            let { downloadables } = this.state;
            if (downloadables !== null && downloadables !== undefined) {
                downloadables.map((item => {
                    totalScore += parseInt(item.weightage)
                }))
            }

            this.props.firebase.addPage(this.state.pageLink).set({
                'banner-images': this.props.banners === 0 ? null : this.props.banners,
                'downloadable-content': downloadables,
                'link': {
                    icon: `${this.state.pageIcon}`,
                    link: `${this.state.pageLink}`,
                    position: parseInt(this.state.pagePosition),
                    text: `${this.state.pageText}`,
                },
                'page-header': {
                    'header-color': `${this.state.headerColor}`,
                    icon: `${this.state.pageIcon}`,
                    subtitle: `${this.state.headerSub}`,
                    title: `${this.state.pageText}`,
                },
                'total-score': totalScore,
                'franchise': this.props.match.params.franchise
            }, {merge: true})
                .then((res) => {
                    this.onClose();
                    this.props.clear();
                })
                .catch((rej) => {
                    alert('page not added');
                })
        }
    }

    handIconSelect = (e) => {
        this.setState({
            pageIcon: e
        })
    }

    handContentType = (e) => {
        this.setState({
            downloadableContentType: e
        }, () => {
            this.setState({
                downloadableHref: '',
            })
        })
    }

    setFile = (e , name) => {
        this.setState({
            downloadableHref: e,
            downloadableHrefName: name
        })
    }

    onChange = (e) => {
        if (e.target.name === 'pageText') {
            this.setState({
                [e.target.name]: e.target.value,
            }, () => {
                this.setState({
                    pageLink: this.slugify(this.state.pageText)
                })
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            pageText: "",
            editMode: false,
            pageIcon: "gift",
            pageLink: "",
            editPageKey: '',
            editObjectKey: '',
            pagePosition: "",
            headerColor: "#3e85c5",
            headerIcon: "",
            headerSub: "",
            headerTitle: "",
            totalScore: "",
            bannerImage: null,
            bannerImageTitle: '',
            bannerImageURL: '',
            downloadables: null,
            downloadableContent: "",
            downloadableContentType: "pdf",
            downloadableDescription: "",
            downloadableHref: "",
            downloadableKey: "",
            downloadableTitle: "",
            downloadableWeightage: "",
        });
    };


    onDelete = (param) => {
        this.setState({
            deletePageSlug: param
        }, () => {
            this.showModal()
        })
    }

    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    handleOk = () => {
        this.props.firebase.deletePage(this.state.deletePageSlug).then(() => {
            this.setState({
                visibleModal: false,
            });
        })
    };

    handleCancel = e => {
        this.setState({
            visibleModal: false,
        });
    };

    onEdit = param => {
        this.props.firebase.getPage(param).
            then((doc) => {
                if (doc.exists) {
                    let pageData = doc.data();
                    this.setState({
                        editMode: true,
                        pageText: pageData.link.text,
                        pageIcon: pageData.link.icon,
                        pageLink: pageData.link.link,
                        pagePosition: pageData.link.position,
                        headerColor: pageData['page-header']['header-color'],
                        headerSub: pageData['page-header'].subtitle,
                        totalScore: pageData['total-score'],
                        bannerImage: pageData['banner-images'],
                        downloadables: pageData['downloadable-content'],
                    }, () => {
                        this.state.bannerImage && this.state.bannerImage.map((item, index)=>{
                            this.props.add({
                                fileName: item.image,
                                url: item.url
                            })
                        })
                        this.showDrawer();
                    })
                }
            })
    }

    editDownloadableContent = (index) => {
        let { downloadables } = this.state;
        if (index !== -1) {
            this.setState({
                editDCIndex: index,
                downloadableContent: downloadables[index].content,
                downloadableTitle: downloadables[index].title,
                downloadableContentType: downloadables[index]['content-type'],
                downloadableDescription: downloadables[index].description,
                downloadableHref: downloadables[index].href,
                downloadableWeightage: downloadables[index].weightage
            })
        }
    }

    addEditedDownloadableContent = index => {
        let { downloadables } = this.state;
        if (index !== -1) {
            downloadables[index] = {
                content: this.state.downloadableContent,
                'content-type': this.state.downloadableContentType,
                description: this.state.downloadableDescription,
                href: this.state.downloadableHref === '' ? this.state.downloadableIframe : this.state.downloadableHref,
                key: this.slugify(this.state.downloadableTitle),
                weightage: parseInt(this.state.downloadableWeightage),
                title: this.state.downloadableTitle,
            }
            this.setState({
                downloadables: downloadables
            }, () => {
                this.setState({
                    editDCIndex: '',
                    downloadableContent: '',
                    downloadableContentType: '',
                    downloadableDescription: '',
                    downloadableTitle: '',
                    downloadableHref: '',
                    downloadableWeightage: '',
                })
            })
        }
    }

    handleUpdate = () => {
        this.props.firebase.updatePage().set({

        }, { merge: true })
    }

    cancelEditedDownloadableContent = () => {
        this.setState({
            editDCIndex: '',
            downloadableContent: '',
            downloadableContentType: '',
            downloadableDescription: '',
            downloadableTitle: '',
            downloadableHref: '',
            downloadableWeightage: '',
        })
    }

    render() {
        return (
            <Row >
                <Col className="route-height">
                    <PageHeader
                        style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
                        title={<BackIcon icon={"desktop"} color="white" title={"Content Management"} />}
                        className="page-header"
                    />
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visibleModal}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <h3>Are you sure you want to delete this page</h3>
                    </Modal>
                    <AddNewPage setFile={this.setFile} cancelEditedDownloadableContent={this.cancelEditedDownloadableContent} addEditedDownloadableContent={this.addEditedDownloadableContent} editDownloadableContent={this.editDownloadableContent} removeDownloadables={this.removeDownloadables} addContent={this.addContent} removeBannerImage={this.removeBannerImage} handContentType={this.handContentType} addBannerImage={this.addBannerImage} handIconSelect={this.handIconSelect} handleSubmit={this.handleSubmit} state={this.state} onChange={this.onChange} visible={this.state.visible} showDrawer={this.showDrawer} onClose={this.onClose} />
                    <ContentTable onEdit={this.onEdit} onDelete={this.onDelete} data={this.state.pages} />
                </Col>
            </Row>
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

const ContentManagement = connect(mapStateToProps, mapDispatchToProps)(withRouter(withFirebase(ContentManagementBase)));

export default ContentManagement;
