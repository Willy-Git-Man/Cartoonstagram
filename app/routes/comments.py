from app.forms.comments import CommentsPostForm
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models.comments import Comment
from app.models.post import Post

from app.models.db import db

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/')
def get_comments():
    all_comments = Comment.query.all()
    print(all_comments)
    return {'comments': [comment.to_dict() for comment in all_comments]}

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

# @posts.route('', methods=["POST"])
# def create_post():
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         print('Helloee')
#         post = Post(
#             user_id=form.data['user_id'],
#             img_src=form.data['img_src'],
#             caption_content=form.data['caption_content'],
#             location=form.data['location'],
#             created_at=datetime.now()
#         )
#         db.session.add(post)
#         db.session.commit()
#         return post.to_dict()
