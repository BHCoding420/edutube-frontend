import React from 'react'
import {CommentModel} from '../../../models/Comment.model';
import {getCurrentUser} from '../../../services/getCurrentUser';


const Comment = ({comment}:any) => {
  let user:any = getCurrentUser();
  return (
    <div className="d-flex my-2">

    <img src={comment.creator.pic || user.pic} alt="Avatar" className="avatar mx-2"/>

    <input type="text" className="form-control" placeholder={comment.content} readOnly/>


  </div>
  )
}

export default Comment