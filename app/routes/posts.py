from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models.db import db
from app.models.post import Post
from app.forms.post_form import PostForm

posts = Blueprint('posts', __name__)


@posts.route('/')
def get_post():
    allpost = Post.query.all()
    print(allpost)
    return {'posts': [post.to_dict() for post in allpost]}

@posts.route('/', methods=["POST"])
def create_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            img_src=form.data['img_src'],
            caption_content=form.data['caption_content'],
            location=form.data['location'],
            created_at=form.data['created_at']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    
