import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'
import { Card, Icon, Tag, Divider, Row, Col, Button, List, Empty, message } from 'antd';
import HOSTNAME from '../helpers/hostname';

const { Meta } = Card;

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

class ViewActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: {},
            activity:[]

        }
    }

    

    componentDidMount(){
      axios.get(`${HOSTNAME}/api/topic/`)
      .then(res => {
        let topic = {}
        res.data.map( item =>
          topic[item.id] = item.name
        )
        this.setState({ topics: topic })
      })
    }

      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = (e, id) => {
        this.setState({
          visible: false,
        });
      };

      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };




    render(){
        return(
          <div>
            {
              this.props.data.length > 0 ? 
            <List
              itemLayout="horizontal"
              size="middle"
              pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 2
              }}
              dataSource={this.props.data}

              renderItem={item => (
                <div style={{display:"flex", justifyContent:"center", alignItems:"center" }}>
                  <Card
                    style={{width:'30vw', minWidth:300, borderColor:'gray', borderRadius:20}}
                    cover={
                      <div
                        style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"5%" }}>
                        <img
                            style={{width: '90%', height: '90%'}}
                            alt="Foto de la actividad"
                            src={item.picture}
                        />
                      </div>
                    }
                  >
                    <Meta
                      style={{textAlign:'center'}}
                      title= {<a href={`/activity/${item.id}/`}>{item.name}</a>}
                    />
                    <br/>
                    <Meta
                      style={{color:'#2F3E9E', overflowWrap: 'break-word'}}
                      description={item.description}
                    />
                    <br/>
                    <br/>

                    { item.topics.map( item => (
                      <Tag key={item}>{this.state.topics[item]}</Tag>
                      ))
                    }
                  
                </Card>
              </div>
            )}
          />
          :
              <Row type="flex" justify="center" align="middle">
                <Empty description={<span style={{fontSize:20, color:'#001870'}}>No se han creado actividades.</span>}/>
              </Row>
              }
            </div>
        )
    }
}

export default ViewActivity