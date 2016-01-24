var React = require('react');
var ReactDOM = require('react-dom');

var Modal = require('react-bootstrap').Modal;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;



var MySmallModal = React.createClass({
    render() {
        return (
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Contact Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div><MyContactForm {...this.props} /></div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        );
    }
});

/*Antibiotic 21.01.2016
* Collapsing Button in general use for Rules and Conditions
* But can extends any text
*/
class RulesAndConditions extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Button onClick={ ()=> this.setState({ open: !this.state.open })} >
                    Rules and Conditions
                </Button>
                <Collapse in={this.state.open}>
                    <div>
                        <Well>
                            {this.props.children}
                        </Well>
                    </div>
                </Collapse>
            </div>
        );
    }
}

/* Antibiotic 21.01.2016
 * Contact form
 * Extends props from Modal on call
 * The Close Button use extended props from Modal to close parent Modal
*/
var MyContactForm = React.createClass({

    getInitialState() {
        return {
            disabled: true
        };
    },

    handleChange(event) {
        var checked = event.target.checked
        if(checked) {
            this.setState({
                disabled: !event.target.checked
            });
        } else {
            this.setState({
                disabled: !event.target.checked
            });

        }
    },

    render: function() {
        return (
            <form>
                <Input type="text" label="Name" placeholder="Your Name" bsSize="large" />
                <Input type="email" label="Email" placeholder="Your Email" bsSize="large"/>
                <Input type="textarea" label="Massage" placeholder="Please tell me more" bsSize="large"/>

                <RulesAndConditions>Rules and Conditions</RulesAndConditions>
                <Input ref="MyCheckbox" onChange={this.handleChange} type="checkbox" label="Confirm" readOnly bsSize="large"/>

                <ButtonGroup vertical block>
                    <Button type="reset" bsStyle="warning" bsSize="large">Reset</Button>
                    <p/>
                    <Button ref="submitButton" type="submit" bsStyle="success" bsSize="large" disabled={this.state.disabled}
                           >Submit</Button>
                    <p/>
                    <Button onClick={this.props.onHide} bsStyle="danger" bsSize="large">Close</Button>
                </ButtonGroup>
            </form>
        )
    }
});

/* Antibiotic 21.01.2016
 * This App creating Button
 * And call Modal MySmallModal with passed props
*/
var App = React.createClass({
    getInitialState() {
        return { smShow: false};
    },

    showModal() {
        this.setState({show: true});
    },

    hideModal() {
        this.setState({show: false});
    },

    render() {
        let smClose = () => this.setState({ smShow: false });

        return (
            <ButtonToolbar>
                <Button bsStyle="primary" onClick={()=>this.setState({ smShow: true })}>
                    Contact Form
                </Button>

                <MySmallModal show={this.state.smShow} onHide={smClose} />
            </ButtonToolbar>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('booking'));