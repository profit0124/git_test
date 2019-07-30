import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, CardImg,  CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    renderDish(dish) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
        
    }

    renderComments(dish) {
            if (dish != null){
            const com = "Comment";
            return(
                <div>
                    <h4>{com}</h4>
                    <div>
                        {dish.comments.map((comment) => {
                            
                            return(
                                <div>
                                    <div>{comment.comment}</div><br></br>
                                    <div>{"-- "}{comment.author}{" , "}<Moment format="MMM DD, YYYY">{comment.date}</Moment></div><br></br> 
                                </div>
                            );
                            
                        })}
                    </div>
                </div>
                
            );
        }
        else
            return(
                <div></div>
            ); }

    render() {
        console.log(this.props.dish);
        if (this.props.dish != null)
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            )
        else
            return(
                <div></div>
            );
    }



}

export default DishDetail;