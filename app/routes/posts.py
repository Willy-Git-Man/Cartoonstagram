from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

from app.models.db import db
from app.models.post import Post
from app.models.user import User
from app.forms.post_form import PostForm
from app.models.follows import follow

posts = Blueprint('posts', __name__)


@posts.route('')
def get_post():
    user = current_user
    followeds_posts = user.followed_posts()
    return {'posts': [post.to_dict() for post in followeds_posts]}

@posts.route('', methods=["POST"])
@login_required
def create_post():
    if "img_src" not in request.files:

        return {"errors": "image required"}, 400

    img_src = request.files['img_src']


    if not allowed_file(img_src.filename):

        return {"errors": "file type not permitted"}, 400

    img_src.filename = get_unique_filename(img_src.filename)

    upload = upload_file_to_s3(img_src)

    if "url" not in upload:

        return upload, 400

    user_id = current_user.id
    img_src = upload["url"]
    caption_content = request.form["caption_content"]
    location = request.form["location"]

    post = Post(
        user_id=user_id,
        img_src=img_src,
        caption_content=caption_content,
        location=location,
        created_at=datetime.now()
    )

    db.session.add(post)
    db.session.commit()
    return post.to_dict()



@posts.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()

    return post.to_dict()

@posts.route('/<int:id>/update', methods=['POST'])
def edit_post(id):
    if "img_src" not in request.files:
        post = Post.query.get(id)

        user_id = current_user.id
        caption_content = request.form["caption_content"]
        location = request.form["location"]

        post.user_id = user_id
        post.caption_content = caption_content
        post.location = location
        post.created_at = datetime.now()

        db.session.commit()
        return post.to_dict()

    else:
        img_src = request.files['img_src']


        if not allowed_file(img_src.filename):
            return {"errors": "file type not permitted"}, 400

        img_src.filename = get_unique_filename(img_src.filename)

        upload = upload_file_to_s3(img_src)

        if "url" not in upload:
            return upload, 400

        post = Post.query.get(id)

        user_id = current_user.id
        img_src = upload["url"]
        caption_content = request.form["caption_content"]
        location = request.form["location"]

        post.user_id = user_id
        post.img_src = img_src
        post.caption_content = caption_content
        post.location = location
        post.created_at = datetime.now()

        db.session.commit()
        return post.to_dict()
