import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelect extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const avatarList = ['boy', 'man', 'girl', 'woman', 'bull', 'chick', 'crab', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'pig', 'tiger', 'whale', 'zebra'].map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }))

    const gridHeader = this.state.icon ? 
                          (<div>
                            <span>已选择头像</span>
                            <img src={{width: 20}} src={this.state.icon} />
                          </div>)
                          : <div>请选择头像</div>

    return (
      <div>
        <List renderHeader={gridHeader}>
          <Grid 
            data={avatarList} 
            columnNum={5}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}></Grid>
        </List>
      </div>
    );
  }
}

export default AvatarSelect;