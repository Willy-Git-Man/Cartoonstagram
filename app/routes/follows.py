from flask import Blueprint, redirect
import json
from flask_login import login_required, current_user
from app.models import User , db, follows


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:id>', methods = ['GET'])
@login_required
def get_followers(id):
    user = User.query.get(id)
    followeds = user.followed.all()
    print(followeds, 'were in the follow route')
    return {'follows': [follow.to_dict() for follow in followeds]}

@follow_routes.route('/<int:id>', methods = ['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


@follow_routes.route('/<int:id>/unfollow', methods = ['POST'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()
