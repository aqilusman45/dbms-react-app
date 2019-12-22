import React from 'react';
import { Col, Row, Input, Select, Icon ,PageHeader, Button } from 'antd';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
const { Option } = Select;

const INITIAL_STATE = {
    nid: '',
    ntype: 'Fajr',
    imam: '',
    muazzin: '',
    time: '',
    imams: [],
    muazzins: [], 
    status: false,
}



const slugify = (string) => {
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



const BackIcon = ({ icon, title, color }) => (
    <div className="back-icon-container ant-page-header-heading">
        <span style={{ color: color }} className="back-icon-title ant-page-header-heading-title">
            <Icon className="back-icon-banner" type={icon || ""} />
            {title || ""}
        </span>
    </div>
);

class AddNewNamazBase extends React.Component {
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    componentDidMount(){
        Axios.get("http://localhost:3002/members/get-members")
        .then((res) => {
            let { muazzins, imams } = this.state;
            muazzins = [] 
            imams = []
            var itemsProcessed = 0;
            res.data.result.forEach((item, index, array) => {
                console.log(item);
                
                if(item.designation === 'imam'){
                    imams.push({
                        name: item.name,
                        designation: item.designation,
                        phoneno: item.phoneno,
                    })
                }else if(item.designation === "muazzin"){
                    muazzins.push({
                        name: item.name,
                        designation: item.designation,
                        phoneno: item.phoneno,
                    })
                }
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    this.setState({
                        muazzins: muazzins,
                        imams: imams
                    })
                }
            });
        })
        .catch((rej) => {
            console.log(rej);
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onIdInput = e => {
      let id  =  slugify(e.target.value)
      this.setState({
          nid: id,
      })
    }

    selectMuazzin = e => {
        this.setState({
            muazzin: e
        })
    }
    
    selectImam = e => {
        this.setState({
            imam: e,
        })
    }

    selectNamaz = e => {
        this.setState({
            ntype: e
        })
    }

    handleSubmit = e => {
        console.log(this.state);
        
        e.preventDefault()  
        if (this.state.nid === '') {
            alert('Please Enter Namaz ID')
        }else if (this.state.ntype === ''){
            alert('Please Enter Type')
        }else if (this.state.imam === ''){
            alert('Please Select Imam')
        }else if (this.state.muazzin === '') {
            alert('Please Select Muazzin')            
        }else if (this.state.time === ''){
            alert('Please Enter date.')
        }else {
            Axios.post('http://localhost:3002/namaz-times/add-namaz', {
                'nid': this.state.nid,
                'name': this.state.name,
                'ntype' : this.state.ntype,
                'imam': this.state.imam,
                'time': this.state.time,
                'muazzin': this.state.muazzin,
                'status': this.state.status  ? 1 : 0,
            })
            .then((res)=>{
                this.props.history.push('/admin/namaz-times')
            })
            .catch((rej)=>{
                console.log(rej);
            })
        }
    }

    selectStatus = e => {
        this.setState({
            status: e,
        })
    }

    render() {
        const state  = this.state
        console.log(this.state);
        
        return (
            <Row >
                <Col className="route-height">
                    <PageHeader
                        style={{ backgroundColor: '#3e85c5', boxShadow: "0px 1px 10px grey" }}
                        title={<BackIcon icon={"desktop"} color="white" title={"Add Namaz"} />}
                        className="page-header"
                    />
            <div>
                    <div className="create-new-page-form-wrapper">
                        <form className="create-new-page-form" layout="vertical">
                            <fieldset>
                                <Row gutter={6}>
                                    <Col span={12}>
                                        <label>
                                           Namaz ID
                                    <Input required={true} onChange={this.onIdInput} name="name" value={this.state.nid} placeholder="Namaz ID" />
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Select Namaz
                                    <Select required={true} onChange={this.selectNamaz} value={this.state.ntype} placeholder="Please select type">
                                                <Option value="Fajr">Fajr</Option>
                                                <Option value="Zuhr">Zuhr</Option>
                                                <Option value="Asr">Asr</Option>
                                                <Option value="Maghrib">Maghrib</Option>
                                                <Option value="Esha">Esha</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={6}>
                                    <Col span={12}>
                                    <label>
                                            Select Imam
                                    <Select required={true} onChange={this.selectImam} value={this.state.imam} placeholder="Please select type">
                                               {this.state.imams && this.state.imams.map((item, index, array)=>{
                                                 return (
                                                    <Option value={item.phoneno}>{item.name}</Option>
                                                 )
                                               })}
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                            Select Muazzin
                                    <Select required={true} onChange={this.selectMuazzin} value={this.state.muazzin} placeholder="Please select type">
                                               {this.state.muazzins && this.state.muazzins.map((item, index, array)=>{
                                                 return (
                                                    <Option value={item.phoneno}>{item.name}</Option>
                                                 )
                                               })}
                                            </Select>
                                        </label>
                                    </Col>
                                </Row>
                                <Row gutter={6}>
                                    <Col span={12}>
                                    <label>
                                            Select Status
                                    <Select required={true} onChange={this.selectStatus} value={this.state.status} placeholder="Please select type">
                                                    <Option value={true}>Enable</Option>
                                                    <Option value={false}>Disable</Option>
                                            </Select>
                                        </label>
                                    </Col>
                                    <Col span={12}>
                                        <label>
                                               Select Time
                                                <Input required={true} type="time" onChange={this.onChange} name="time" value={this.state.time} placeholder="Select Time" />
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


const AddNewNamaz = withRouter(AddNewNamazBase);
export default AddNewNamaz