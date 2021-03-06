import React, { Component } from 'react';
import {  Button, Modal, ModalHeader, ModalBody, Row, Label} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';



const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);



class CommentForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        //alert("Current state is: " + JSON.stringify(values));
        this.toggleModal()
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.resetCommentForm();
        // event.preventDefault();
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            <Form model="comment" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                
                                    <Control.select model=".rating" name="rating" 
                                        className="form-control"
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15),
                                            }}
                                            />
                                            <Errors 
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        className="form-control" />
                                </Row>
                                <Row className="form-group">
                                    
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                </Row>
                            </Form>
                        </div>
                    </ModalBody>
                </Modal>

            </div>
        );
        

    }


}

export default CommentForm;