import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinner'
import classnames from 'classnames'
import Webcam from 'react-webcam'

import 'react-spinner/react-spinner.css'
import styles from './Selfie.scss'
import * as Types from 'types'
import Container from 'components/Container'

const STATES = {
  LOADING: 'loading',
  REQUESTING_PERMISSION: 'requesting_permission',
  HAS_PERMISSION: 'has_permission'
}

let Close = (props) => {
  return (
    <div className={styles.close} onClick={props.onClick}>&times;</div>
  )
}

let Spinner_ = (props) => {
  if (props.isVisible) {
    return <Spinner />
  } else {
    return <span />
  }
}

let Button = (props) => {
  if (props.isVisible) {
    return <div className={styles.button} onClick={props.onClick}/>
  } else {
    return <span />
  }
}

class Selfie extends React.Component {
  constructor() {
    super()

    this.onUserMedia = this.onUserMedia.bind(this)
    this.onTake = this.onTake.bind(this)

    this.state = {
      STATE: STATES.IS_LOADING
    }
  }

  componentWillUnmount() {
    if (this.pendingRequest) this.pendingRequest.cancel()
  }

  onUserMedia(media) {
    this.setState({ STATE: STATES.HAS_PERMISSION })
  }

  onTake() {
    let screenshot = this.refs.webcam.getScreenshot()
    debugger
    this.props.onDone(new Types.Image({
      src: screenshot,
      alt: 'selfie'
    }))
  }

  render() {
    return (
      <Container isExpanded={true} {...this.props}>
        <Close onClick={() => { this.props.onDone() }} />
        <Webcam
          ref='webcam'
          audio={false}
          height={300}
          width={400}
          onUserMedia={this.onUserMedia}
          className={styles.video}
        ></Webcam>
        <Button
          isVisible={this.state.STATE == STATES.HAS_PERMISSION}
          onClick={this.onTake}
        />
        <Spinner_
          isVisible={this.state.STATE = STATES.IS_LOADING}
        />
      </Container>
    )
  }
}
Selfie.propTypes = {
  onDone: React.PropTypes.func.isRequired
}
Selfie.match = "selfie"

export default Selfie
