import React from 'react';
import { Col, Row, Input, Select, Icon ,PageHeader, Button } from 'antd';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
const { Option } = Select;

const INITIAL_STATE = {
    name: '',
    phoneno: '03',
    address: '',
    avalability: false,
    designation: 'imam',
    gender: '',
    martial_status:'Single',
    dob:'',
    emgcontact:'03',
    email:'',
    salary:'',
    joiningdate:'',
    departuredate:'',
    medical_allowance: false,
    academics_qualifications:'',
    conveyance: false,
    accomadation_allocated: false,
}


const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);

class AddNewMemberBase extends React.Component {
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    designation = e => {
        this.setState({
            designation: e
        })
    }

    avalability = e => {
        this.setState({
            avalability: e
        })
    }

    martial_status = e => {
        this.setState({
            martial_status: e
        })
    }

    gender = e => {
        this.setState({
            gender: e
        })
    }

    medical_allowance = e => {
        this.setState({
            medical_allowance: e,
        })
    }

    accomadation_allocated = e => {
        this.setState({
            accomadation_allocated: e 
        })
    }

    conveyance = e => {
        this.setState({
            conveyance: e
        })
    }

    handleSubmit = e => {
        e.preventDefault()  
        if (this.state.academics_qualifications === '') {
            alert('Please Enter Acdemic Qualification')
        }else if (this.state.address === ''){
            alert('Please Enter Address')
        }else if (this.state.dob === ''){
            alert('Please Enter DOB')
        }else if (this.state.email === ''){
            alert('Please Enter Email')
        }else if (this.state.name === ''){
            alert('Please Enter Name')
        }else if (this.state.phoneno === '' || this.state.phoneno.length < 11){
            alert('Invalid Phone Number')
        }else if (this.state.salary === ''){
            alert('Please Enter Salary')
        }else if (this.state.emgcontact === '' || this.state.emgcontact.length < 11) {
            alert('Please Enter Emergency Contact')            
        }else if (this.state.joiningdate === '') {
            alert('Please Enter Date of Joining')                        
        }else if (this.state.gender === ''){
            alert('Please Select Gender')            
        }else {
            Axios.post('http://localhost:3002/members/add-member', {
                'accomadation_allocated': this.state.accomadation_allocated ? 1 : 0,
                'conveyance': this.state.conveyance ? 1 : 0,
                'academics_qualifications' : this.state.academics_qualifications,
                'medical_allowance': this.state.medical_allowance ? 1 : 0,
                'departuredate': this.state.departuredate,
                'joiningdate': this.state.joiningdate,
                'salary': this.state.salary,
                'email': this.state.email,
                'emgcontact': this.state.emgcontact,
                'dob': this.state.dob,
                'martial_status': this.state.martial_status,
                'gender': this.state.gender,
                'designation': this.state.designation,
                'avalability': this.state.avalability ? 1 : 0,
                'address': this.state.address,
                'name': this.state.name,
                'phoneno': this.state.phoneno,
            })
            .then((res)=>{
                this.props.history.push('/admin/members')
            })
            .catch((rej)=>{
                alert(JSON.parse(rej.request.response.error.sqlMessage));
            })
        }
    }

    phoneInput = e =>{
        if (e.target.value.length <= 11) {
            var newString = e.target.value.replace(/[^A-Z0-9]/ig, "");
            this.setState({
                [e.target.name]: newString,
            })
        }
    }
    
    render() {
        const state  = this.state
        return (
            <Row >
                <Col className="route-height">
                    <PageHeader
                        style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
                        title={<BackIcon icon={"desktop"} color="white" title={"Add New Member"} />}
                        className="page-header"
                    />
            <div>
                    <div className="create-new-page-form-wrapper">
                        <form className="create-new-page-form" layout="vertical">
                            <fieldset>
                                <legend>Member Form</legend>
                                <Row gutter={6}>
                                    <Col span={12}>
                                        <label>
                                           Name
                                    <Input required={true} onChange={this.onChange} name="name" value={this.state.name} placeholder="Full Name" />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Designation
                                    <Select required={true} name="designation" onChange={this.designation} value={this.state.designation} placeholder="Please select desgination">
                                                <Option value="imam">Imam</Option>
                                                <Option value="muazzin">Muazzin</Option>
                                                <Option value="qari"> Qari</Option>
                                                <Option value="naat khawan">Naat Khawan</Option>
                                                <Option value="noha khawan">Noha Khawan</Option>
                                                <Option value="security guard">Security</Option>
                                                <Option value="maintainence">Maintainence</Option>
                                                <Option value="management">Management</Option>
                                                <Option value="Labour">Labour</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Phone No.
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="phoneno"
                                                type="text"
                                                onChange={this.phoneInput}
                                                value={state.phoneno}
                                                placeholder="+92XXX-XXXXX-XX"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Avalability
                                            <Select required={true} name="availabilty" onChange={this.avalability} value={this.state.avalability} placeholder="Please select availabilty">
                                                <Option value={true}>Available</Option>
                                                <Option value={false}>Not Available</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Address
                                    <Input
                                                style={{ width: '100%' }}
                                                name="address"
                                                type="text"
                                                onChange={this.onChange}
                                                value={state.address}
                                                placeholder="Address e.g House No. X Karachi"
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Martial Status
                                            <Select required={true} name="martial_status" onChange={this.martial_status} value={this.state.martial_status} placeholder="-Select Marital Status-">
                                            <Option value="Single">Single</Option>
                                            <Option value="Married">Married</Option>
                                            <Option value="Widowed">Widowed</Option>
                                            <Option value="Separated">Separated</Option>
                                            <Option value="Divorced">Divorced</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Date of Birth
                                    <Input
                                                style={{ width: '100%' }}
                                                name="dob"
                                                type="date"
                                                onChange={this.onChange}
                                                value={state.dob}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Gender
                                            <Select required={true} name="gender" onChange={this.gender} value={this.state.gender} placeholder="-Select Gender-">
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Date of Joining
                                    <Input
                                                style={{ width: '100%' }}
                                                name="joiningdate"
                                                type="date"
                                                onChange={this.onChange}
                                                value={state.joiningdate}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <label>
                                            Email
                                            <Input
                                                style={{ width: '100%' }}
                                                name="email"
                                                type="email"
                                                onChange={this.onChange}
                                                value={state.email}
                                            />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Academic Qualifications
                                    <Input
                                                style={{ width: '100%' }}
                                                name="academics_qualifications"
                                                type="text"
                                                onChange={this.onChange}
                                                value={state.academics_qualifications}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                    <label>
                                            Medical Allowance
                                            <Select required={true} name="medical_allowance" onChange={this.medical_allowance} value={this.state.medical_allowance} placeholder="-Select Medical Allowance Status-">
                                            <Option value={true}>Assigned</Option>
                                            <Option value={false}>Not Assigned</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                    <label>
                                             Accomadation Allocated
                                            <Select required={true} name="accomadation_allocated" onChange={this.accomadation_allocated} value={this.state.accomadation_allocated} placeholder="-Select Accomadation Allocated Status-">
                                            <Option value={true}>Alloted</Option>
                                            <Option value={false}>Not Alloted</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                    <label>
                                            Emergency Phone No.
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="emgcontact"
                                                type="text"
                                                onChange={this.phoneInput}
                                                value={state.emgcontact}
                                                placeholder="+92XXX-XXXXX-XX"
                                            />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                    <label>
                                        Leaving Date
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="departuredate"
                                                type="date"
                                                onChange={this.onChange}
                                                value={state.departuredate}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                    <label>
                                            Salary
                                    <Input
                                                required={true}
                                                style={{ width: '100%' }}
                                                name="salary"
                                                type="number"
                                                onChange={this.onChange}
                                                value={state.salary}
                                                placeholder="30000"
                                            />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                    <label>
                                            Conveyance
                                            <Select required={true} name="conveyance" onChange={this.conveyance} value={this.state.conveyance} placeholder="-Select Conveyence Status-">
                                            <Option value={true}>Availed</Option>
                                            <Option value={false}>Not Availed</Option>
                                            </Select>
                                        </label>
                                    </Col>
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
                                <Button onClick={()=>{
                                    this.props.history.push('/admin/members')
                                }} style={{ marginRight: 8 }}>
                                    Cancel
              </Button>
                                {
                                    (<Button onClick={this.handleSubmit} type="primary">
                                        {state.editMode ? 'Update' : 'Submit'}
                                    </Button>)
                                }
                            </div>
                        </form>
                    </div>
            </div>
                </Col>
            </Row>
        );
    }
}


const AddNewMember = withRouter(AddNewMemberBase);
export default AddNewMember