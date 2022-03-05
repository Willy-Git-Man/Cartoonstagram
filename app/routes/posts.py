from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models.db import db
from app.models.post import Post
from app.forms.post_form import PostForm

posts = Blueprint('posts', __name__)


@posts.route('')
def get_post():
    allpost = Post.query.all()
    print(allpost)
    return {'posts': [post.to_dict() for post in allpost]}

@posts.route('', methods=["POST"])
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('Helloee')
        post = Post(
            user_id=form.data['user_id'],
            img_src=form.data['img_src'],
            caption_content=form.data['caption_content'],
            location=form.data['location'],
            created_at=datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
   
