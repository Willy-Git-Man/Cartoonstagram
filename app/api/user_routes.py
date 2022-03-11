from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.post import Post
from app.models.follows import follow


user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     lst = []
#     for user in users:
#         if user.id == follow.c.follower_id:
#             lst.append(user.to_dict())
#     print("ggggggggg",lst)

#     return {'users': lst}

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    user_posts = Post.query.filter(Post.user_id == id).all()
    return {'user': user.to_dict() ,'posts': [post.to_dict() for post in user_posts]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     user_posts = Post.query.filter(Post.user_id == id).all()
#     return {'user': user.to_dict() ,'posts': [post.to_dict() for post in user_posts]}
