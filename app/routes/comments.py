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
    # print(all_comments)
    # all_comments = db.session.query(Comment.id, Comment.user_id, Comment.post_id, Comment.comment_content, User.username, User.profile_img_src).join(User).filter(Comment.post_id == post_id).all()
    print(all_comments)
    return {'comments': [comment.to_dict() for comment in all_comments], 'users': [user.to_dict() for user in all_users]}

@comments_routes.route('', methods=["POST"])
def post_comments():
    # post = Post.query.get(postId)
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
    print('commen#########################################t:', form.comment_content)
    comment.comment_content = form.comment_content.data

    #  post.caption_content = form.caption_content.data
    # db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
