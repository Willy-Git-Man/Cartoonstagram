from flask import Blueprint, redirect
import json
from flask_login import login_required, current_user
from app.models import db, likes
from app.models.post import Post
from app.models.likes import Like

likes_routes = Blueprint('likes', __name__)

# @likes_routes.route('', methods = ['GET'])
# @login_required
# def get_likes(id):
#     post = Post.query.get(id)
#     likes = post.liked.all()
#     print(likes, 'in the likes route')
#     return {'likes': [liked.to_dict() for like in likes]}

@likes_routes.route('/<int:id>', methods = ['POST'])
@login_required
def like(id):
    like = Like(
        id=12,
        user_id=1,
        post_id=2
    )
    # if user == current_user:
    #     return redirect('/')
    # current_user.like(post)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


# @follow_routes.route('/<int:id>/unfollow', methods = ['POST'])
# @login_required
# def unlike(id):
#     post = Post.query.get(id)
#     # if user == current_user:
#     #     return redirect('/')
#     current_user.unlike(post))
#     db.session.commit()
#     return user.to_dict()