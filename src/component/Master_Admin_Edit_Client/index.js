import React, { Component } from 'react';
import { Col, Row, Input, Button, PageHeader, Icon } from 'antd';
import { withFirebase } from '../Firebase';
import { withRouter } from "react-router-dom";
import AddLogoImage from "../Add_Logo";
import { LogoActions } from "../../store/actions/logos";
import { connect } from "react-redux";
const INITIAI_STATE = {
    franchiseName: '',
    franchiseSlug: '',
    franchiseLogo: '',
    colorScheme: '',
    error: '',
    editMode: false,
}

const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);


class EditFranchiseBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAI_STATE }
    }

    componentWillMount() {
        this.props.firebase.getFranchiseData(this.props.match.params.franchise)
            .then((res) => {
               if (res.empty) {
                this.props.history.push(`/master-admin/view-clients`)
               }else {
                res.docs.forEach(element => {
                    this.setState({
                        franchiseName: element.data().name,
                        franchiseSlug: element.data().slug,
                        franchiseLogo: element.data().logo,
                    })
                    this.props.add({
                        fileName: element.data().imageName,
                        url: element.data().logo
                    })
                });
               }
            })
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

    onChange = e => {
        if (e.target.name === 'franchiseName') {
            this.setState({
                [e.target.name]: e.target.value,
            }, () => {
                this.setState({
                    franchiseSlug: this.slugify(this.state.franchiseName)
                })
            })
        }
    }

    onSubmit = e => {
        if (this.state.franchiseName === '') {
            alert('Please enter name of Franchise')
        } else if (Object.values(this.props.logo).length === 0) {
            alert('Please select logo')
        } else {
            this.props.firebase.updateFranchise({
                name: this.state.franchiseName,
                slug: this.state.franchiseSlug,
                docRef: this.props.match.params.franchise,
                logo: this.props.logo.url,
                imageName: this.props.logo.title,
            })
            .then((res)=>{
                this.props.removeLogo();
                this.props.history.push(`/master-admin/view-clients`)
                this.setState({ ...INITIAI_STATE })
            })
               
        }
    }

    render() {
        return (
            <div>
                <div className="create-new-page-form-wrapper">
                    <form className="create-new-page-form" layout="vertical">
                        <fieldset>
                            <legend>Page Info</legend>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <label>
                                        Enter Franchise Name
                                    <Input required={true} disabled={this.state.editMode ? true : false} onChange={this.onChange} name="franchiseName" value={this.state.franchiseName} placeholder="Franchise Name" />
                                    </label>
                                </Col>
                                <Col span={12}>
                                    <label>
                                        URL
                                    <Input
                                            style={{ width: '100%' }}
                                            name="franchiseSlug"
                                            value={this.state.franchiseSlug}
                                            disabled
                                            pattern="^(?:\d+(?:-\d+)?(?:,|$))+$"
                                            title="No spaces allowed for url"
                                            placeholder="slug"
                                        />
                                    </label>
                                </Col>
                            </Row>
                        </fieldset>
                        <AddLogoImage />
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
                    </form>
                    <Button type="primary" onClick={this.onSubmit} style={{ marginRight: 8 }}>
                        Edit Franchise
              </Button>
                </div>
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


const EditFranchise = connect(mapStateToProps, mapDispatchToProps)(withFirebase(withRouter(EditFranchiseBase)));

export default EditFranchise;