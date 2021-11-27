import React, { Component } from 'react';
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/comment/list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments : [],
            content : ""
        }
    }

    loadingComments = async () => { 
        try { 
            const res = await axios.get("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments", {
                params: {
                    todo : this.props.todoId
                }
            });
            this.setState({ comments: res.data.comments });
            console.log(this.state.comments)
        } catch (e) { 
            console.log(e); 
        }
    }

    writeComment = () => {
        axios.post("http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com/comments", {
            todo: this.props.todoId,
            writer : sessionStorage.getItem("id"),
            content: this.state.content,
        }).then((res) => {
            console.log(res)
            this.loadingComments(); 
        }).catch((err) => {
            console.log(err);
        })
    }

    commentChange = (e) => {this.setState({content: e.target.value})};

    componentDidMount() { 
        const { loadingComments } = this; 
        loadingComments(); 
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Control style={{fontSize:"12px"}}as="textarea" rows={3} placeholder="댓글을 입력하세요." onChange={this.commentChange}/>
                </Form>
                <button type="submit" className="comment-add-button" onClick={this.writeComment}>
                    댓글 작성
                </button>
                <br/>
                <br/>
                {this.state.comments.map((item) => {
                            return (
                                <div className="comments">
                                    <div>
                                        <p className="cm-left">{item.writer_name}</p>
                                        <button type="button" className="cm-cancel-button">
                                            <img alt="" src="/img/cancel.png" className="img-cancel"/>
                                        </button>
                                        <button style={{marginRight:'15px'}}type="button" className="cm-cancel-button">
                                            <img alt="" src="/img/pencil.png" className="img-cancel"/>
                                        </button>
                                        <p className="cm-right">{item.create_at}</p>
                                    </div>
                                    <br/>
                                
                                    <div>
                                        {
                                            item.content.split("\n").map(line => {
                                                return (<span className="cm-content">{line}<br/></span>)
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })}
            </div>
        );
    }
}

export default List;