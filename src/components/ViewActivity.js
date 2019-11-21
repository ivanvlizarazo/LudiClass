import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Card, Tag, Row, List, Empty } from "antd";
import HOSTNAME from "../helpers/hostname";

const { Meta } = Card;

class ViewActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: {},
      activity: []
    };
  }

  componentDidMount() {
    axios.get(`${HOSTNAME}/api/topic/`).then(res => {
      let topic = {};
      res.data.map(item => (topic[item.id] = item.name));
      this.setState({ topics: topic });
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e, id) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.length > 0 ? (
          <List
            itemLayout="horizontal"
            grid={{ 
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 3, }}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 20
            }}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 10px"
                }}
              >
                <Card
                  style={{
                    borderColor: "gray",
                    borderRadius: 20,
                    width: "80vw",
                    height: "max-content",
                    maxWidth: "450px",
                    maxHeight: "fit-content",
                    minHeight: "fit-content",
                  }}
                  cover={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "5%"
                      }}
                    >
                      <img
                        style={{
                          width: "10vw",
                          height: "10vw",
                          borderRadius: "5px",
                          minHeight: "120px",
                          minWidth: "120px"
                        }}
                        alt="Foto de la actividad"
                        src={item.picture}
                      />
                    </div>
                  }
                >
                  <Meta
                    style={{ textAlign: "center"}}
                    title={
                      <a
                        style={{ fontSize: "1.2rem", wordWrap: 'ellipsis' }}
                        href={`/activity/${item.id}/`}
                      >
                        { 
                          item.name.length > 45 ? 
                            item.name[0].toUpperCase().concat(item.name.substring(1).concat('...'))
                            :
                            item.name[0].toUpperCase().concat(item.name.substring(1))
                        }
                      </a>
                    }
                  />
                  <br />
                  <Meta
                    style={{ color: "#2F3E9E", overflowWrap: "break-word" }}
                    description={
                      <p style={{ color: "#149", fontWeight: "bold" }}>
                        {item.description.substring(0, 100).concat(" ...")}
                      </p>
                    }
                  />
                  <br />
                  <br />

                  {item.topics.map(item => (
                    <Tag
                      style={{
                        background: "#DAC6FF",
                        fontWeight: "bold",
                        fontSize: "medium"
                      }}
                      key={item}
                    >
                      {this.state.topics[item]}
                    </Tag>
                  ))}
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Row type="flex" justify="center" align="middle">
            <Empty
              description={
                <span style={{ fontSize: 20, color: "#001870" }}>
                  No se han creado actividades.
                </span>
              }
            />
          </Row>
        )}
      </div>
    );
  }
}

export default ViewActivity;
