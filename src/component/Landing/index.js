import React, { Component } from "react";
import Navbar from "../Navbar";
import { Row, Col, Layout, Button } from "antd";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
const { Header } = Layout;


const INITIAL_STATE = {
  franchises: [],
}

class LandingBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  getFranchises = () =>{
    let franchises = [];
    let itemProcessed = 0
    this.props.firebase.getFranchises()
    .then((docs)=>{
      docs.docs.forEach( (item, index, array) => {
          franchises.push({...item.data()})
          itemProcessed++;
          if (itemProcessed === array.length) {
            this.setState({
              franchises: franchises
            })
          }
      });
    })
  }

  componentWillMount() {
    this.getFranchises()
  }

  render() {
    return (
      <>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Navbar showBread={false} />
        </Header>
        <Row style={{ margin: 0 }} gutter={24}>
          <Col
            xs={{
              span: 24,
            }}
            md={{
              span: 24,
            }}
            lg={{
              span: 24,
            }}
          >
            <div>
              <div>
               {
                 this.state.franchises.length !== 0 ? (
                  <div>
                  <h1 style={{textAlign: "center"}}>
                    Franchises
                  </h1>
                </div>
                 ): (
                   <div style={{textAlign: "center", margin: '10px'}}>
                     <Link to={`/sign-in`}><Button type="primary">Sign In</Button></Link>
                   </div>
                 )
               }
                <div>
                  <ul className="franchise-list-container">
                    {
                      this.state.franchises.map((item, index)=>{
                        return (
                          <li className="franchise-list" key={index++}>
                            <div className="list-container">
                              <Link to={item.slug} >
                                <img className="list-container-image" title={item.name} alt={item.name} src={item.logo}/>
                              </Link>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const Landing = withFirebase(LandingBase);
export { Landing };