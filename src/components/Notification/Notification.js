import React from 'react';
import axios from 'axios';
import '../Notification/Notification.css';
import { getBaseUrl } from '../../utils/Common';

export class Notification extends React.Component {

    constructor(props) {
        super(props);
    }

    markAsRead = (e) => {
        e.preventDefault();
        if(!this.props.read){
            axios.put(`${getBaseUrl()}notifications/${this.props['_id']}`)
            .then(response=> {})
            .catch(error=>{
                console.log(error);
            });  
        }
    }

    render() {
        return (
            <div>
            <div className="card">
                <div className={"card-body " + (this.props.read ? 'read' : 'unread')} onClick={this.markAsRead}> 
                    <img src={this.props.img} alt="avatar" className="avatar"></img> 
                    <span>{this.props.content}</span>
                </div>
            </div>
            </div>
        );
    }
}

