from flask import Blueprint, redirect
import json
from flask_login import login_required, current_user
from app.models import db, likes
from app.models.post import Post
from app.models.likes import Like

likes_routes = Blueprint('likes', __name__)

@likes_routes.route('/<int:id>', methods = ['GET'])
@login_required
def get_likes(id):
    post = Post.query.get(id)
    print(post.id, 'postIdffffffffffffffffffffff')
    print(id)
    likes = Like.query.filter(Like.post_id == post.id).all()
    print(likes, 'in the likes route')
    return {'likes': [like.to_dict() for like in likes]}

@likes_routes.route('/<int:id>', methods = ['POST'])
@login_required
def like(id):

    # print(post, 'looking for post id here')
    like = Like(
        user_id=current_user.id,
        post_id=id
    )


    db.session.add(like)
    db.session.commit()
    return like.to_dict()


@likes_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def unLike(id):
    unlike = Like.query.filter((Like.user_id == current_user.id) and (Like.post_id == id)).first()

    db.session.delete(unlike)
    db.session.commit()
    return unlike.to_dict()

