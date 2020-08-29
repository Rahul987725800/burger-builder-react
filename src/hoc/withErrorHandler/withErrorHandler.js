import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../_Aux/_Aux'
const withErrorHandler = (WrapperComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            })
        }
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;