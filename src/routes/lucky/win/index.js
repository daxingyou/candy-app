import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Row, Col, Table } from 'antd';
import styles from './index.less';
import HeadMenu from '../../../components/headMenu';

class Win extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 20,
    };
  }
  componentDidMount() {
    const self = this;
    this.props.getMine({
      pageIndex: self.state.pageIndex,
      pageSize: self.state.pageSize,
      win: 1,
    });
    this.props.clearBalanceList();
  }
  changePage(data) { /*
   this.props.getMine({
   pageIndex: data.current,
   pageSize: 10000000,
   });*/
  }
  goNext() {
    const self = this;
    this.state.pageIndex++;
    this.setState({
      pageIndex: self.state.pageIndex,
    });
    this.props.getMine({
      pageIndex: self.state.pageIndex,
      pageSize: self.state.pageSize,
      win: 1,
    });
  }
  render() {
    const {
      trend,
      lucky,
    } = this.props;
    const { balanceList, balanceText } = lucky;
    return (
      <Row className={styles.detailTab}>
        <Col xs={24} sm={0}>
          <HeadMenu title="我的中奖记录" back="/lucky" />
        </Col>
        <Col span={24} className={styles.content}>
          {
            balanceList.length ? balanceList.map((item, index) => {
              return (
                <Row className={styles.contain} key={index} >
                  <Col span={24} className={styles.head} >
                    <Col span={6} className={styles.title} >
                      {
                          item.category === 'BJK3'
                            ?
                              <span>
                              北京快三
                            </span>
                            :
                            item.category === 'BJPK10'
                              ?
                                <span>
                                北京PK拾
                              </span>
                              :
                                <span>
                                重庆时时彩
                              </span>
                        }
                    </Col>
                    <Col span={6} className={styles.type} >
                      {
                          item.numberType === 'Z' ?
                            '两面盘'
                            :
                            item.numberType === 'S' ?
                              '1-10名'
                              :
                              item.numberType
                        }
                    </Col>
                    <Col span={6} offset={6} className={styles.win} >
                      中{item.winCount}注 奖{item.winReward}元
                    </Col>
                  </Col>
                  <Col span={24} className={styles.body} >
                    {item.number}
                  </Col>
                  <Col span={24} className={styles.foot} >
                    <Col span={6}>
                      {item.times}倍
                      </Col>
                    <Col span={16} offset={2} className={styles.time} >
                        第{item.serialCode}期 {item.createTime}
                    </Col>
                  </Col>
                </Row>
              );
            }) :
              ''
          }
          <Col span={24} className={styles.showMore}>
            <a onClick={this.goNext.bind(this)}>
              {balanceText}
            </a>
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMine(data) {
      dispatch({ type: 'lucky/getMine', payload: data });
    },
    clearBalanceList() {
      dispatch({ type: 'lucky/clearBalanceList' });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Win);

