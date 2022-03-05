from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.comments import Comment

comments = Blueprint('comments', __name__)


@comments.route('/')
def get_comments():
    all_comments = Comment.query.all()
    print(all_comments)
    return {'comments': [comment.to_dict() for comment in all_comments]}
