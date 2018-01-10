import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import EventEmitter from 'EventEmitter'
import Switch from './switch'

const event = new EventEmitter()

class SwitchButton extends Component {
  state = { value: true }

  onValueChange = () => {
    event.emit('change', !this.state.value)
    this.setState({ value: !this.state.value })
  }

  render() {
    return <Switch style={style.switch} value={this.state.value} onValueChange={this.onValueChange} />
  }
}

export default class SwitchComponent extends Component {
  static navigationOptions = {
    headerRight: <SwitchButton />,
  }

  componentDidMount() {
    this.listener = event.addListener('change', value => this.onSwitch(value))
  }

  componentWillUnmount() {
    this.listener.remove()
  }
}

const style = StyleSheet.create({
  switch: {
    marginRight: 16,
  },
})