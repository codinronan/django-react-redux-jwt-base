import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import './style.scss';


class ProtectedView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.string,
        token: React.PropTypes.string.isRequired,
        actions: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    // Note: have to use componentWillMount, if I add this in constructor will get error:
    // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.
    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchProtectedData(token);
    }

    render() {
        return (
            <div className="protected">
                <div className="container">
                    {this.props.isFetching === true
                        ? <h1>Loading data...</h1>
                        : <div>
                        <h1>Welcome back!</h1>
                        <div className="protected__protected-data margin-top-md">
                            Data from server:
                            <b>{this.props.data}</b>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
export { ProtectedView as ProtectedViewNotConnected };
