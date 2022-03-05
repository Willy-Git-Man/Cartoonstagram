from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.post import Post

posts = Blueprint('posts', __name__)


@posts.route('/')
def get_post():
    allpost = Post.query.all()
    print(allpost)
    return {'posts': [post.to_dict() for post in allpost]}
