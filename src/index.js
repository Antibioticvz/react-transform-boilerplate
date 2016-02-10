var React = require('react');
var ReactDOM = require('react-dom');

var Modal = require('react-bootstrap').Modal;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;


var MySmallModal = React.createClass({
    getInitialState() {
        return {
            thisTitle : document.getElementsByTagName("title")[0].innerHTML
        };
    },

    render() {
        return (

            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm"> Записаться на тренинг :<br/> <b>{this.state.thisTitle}</b> </Modal.Title>
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
            disabled: true,
            style: null
        };
    },

    handleChange() {
        var valid = this.validationState();

            if (valid) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({
                    disabled: true
                });
            }
    },

    getFormData() {
        var data = {
            name: this.refs.name.getValue(),
            mail: this.refs.mail.getValue(),
            text: this.refs.text.getValue()
        };
        this.handleSubmit(data);
    },

    handleSubmit(data) {

       console.log("Hi from handleSubmit");
       console.log(data.name);
       console.log(data.mail);
       console.log(data.text);

       jQuery.post(
           MyAjax.ajaxurl,
           {
               'action': 'send_message',
               'name': data.name,
               'email': data.mail,
               'message': data.text,
               'nonce' : MyAjax.nonce
           },
           function(response){
               alert('The server responded: ' + response);
           }
       );
    },

    /* Antibiotic 26.01.2016
     * function to validate email input
     */
    validationState() {
        var mail = this.refs.mail.getValue();
        var checked = this.refs.MyCheckbox.getChecked();
        var condition;

        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!re.test(mail)) {
            this.setState({
                style: "error"
            });
        }else {
            this.setState({
                style: null
            });
        }

        if(re.test(mail) && checked ){
            condition = true;
            return condition
        }else {
            condition = false;
            return condition
        }
    },

    render() {
        return (
            <form ref="contactForm">
                <Input type="text" ref="name" label="Name" placeholder="Your Name" bsSize="large" />
                <Input type="text" ref="mail" label="Email" placeholder="Your Email" bsSize="large" bsStyle={this.state.style}
                       onChange={this.handleChange} hasFeedback/>
                <Input type="textarea" ref="text" label="Massage" placeholder="Please tell me more" bsSize="large"/>

                <RulesAndConditions>Rules and Conditions</RulesAndConditions>
                <Input ref="MyCheckbox" onChange={this.handleChange} type="checkbox" label="Confirm" readOnly bsSize="large"/>

                <ButtonGroup vertical block>
                    <Button ref="submitButton" type="button" onClick={this.getFormData} bsStyle="success" bsSize="large" disabled={this.state.disabled}
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

    componentDidMount(){
        var btn = document.querySelectorAll('#booking');
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click",()=>this.setState({ smShow: true }));
        }
    },

    render() {
        let smClose = () => this.setState({ smShow: false });

        return (
                <MySmallModal show={this.state.smShow} onHide={smClose}/>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));