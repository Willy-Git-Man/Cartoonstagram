from app.forms.comments import CommentsPostForm
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models.comments import Comment
from app.models.post import Post

from app.models.db import db
from app.models.user import User

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/<int:post_id>')
def get_comments(post_id):
    all_comments = Comment.query.filter(Comment.post_id == post_id).all()
    all_users = User.query.all()
    return {'comments': [comment.to_dict() for comment in all_comments], 'users': [user.to_dict() for user in all_users]}

@comments_routes.route('', methods=["POST"])
def post_comments():
    form = CommentsPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.data['user_id'],
            post_id=form.data['post_id'],
            comment_content=form.data['comment_content'],
        )
        db.session.add(comment)
        db.session.commit()
    return comment.to_dict()

@comments_routes.route('/<int:id>', methods=["DELETE"])
def delete_comments(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

@comments_routes.route('/<int:id>', methods=['POST'])
def edit_post(id):
    form = CommentsPostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    comment.comment_content = form.comment_content.data
    
    db.session.commit()
    return comment.to_dict()
