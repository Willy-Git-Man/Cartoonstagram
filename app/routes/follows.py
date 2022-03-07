from flask import Blueprint, redirect
from flask_login import login_required, current_user
from app.models import User , db


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:id>', methods = ['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.follow(user)
    db.session.commit()
    return 'Success'


@follow_routes.route('/<int:id>/unfollow', methods = ['POST'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    if user == current_user:
        return redirect('/')
    current_user.unfollow(user)
    db.session.commit()
    return 'Success'
