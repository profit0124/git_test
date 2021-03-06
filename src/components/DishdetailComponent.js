import React from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



    function RenderDish({dish}) {
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
        
    }

    function RenderComments({comments, postComment, dishId, resetCommentForm}) {
            if (comments != null){
            const com = "Comment";
            return(
                <div>
                    <h4>{com}</h4>
                    <div>
                        <Stagger in>
                            {comments.map((comment) => {
                                
                                return(
                                    <Fade in>
                                        <div>
                                            <div>{comment.comment}</div><br></br>
                                            <div>{"-- "}{comment.author}{" , "}<Moment format="MMM DD, YYYY">{comment.date}</Moment></div><br></br> 
                                        </div>
                                    </Fade>
                                );
                                
                            })}
                        </Stagger>
                    </div>
                    <CommentForm dishId={dishId} postComment={postComment} resetCommentForm={resetCommentForm}/>
                </div>
                
            );
        }
        else
            return(
                <div></div>
            ); }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} resetCommentForm={props.resetCommentForm}/>
                        
                    </div>
                    
                    
                </div>
                </div>
            )
        else
            return(
                <div></div>
            );
    }




export default DishDetail;