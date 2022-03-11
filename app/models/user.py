from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follows import follow
import json
from app.models.post import Post

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img_src = db.Column(db.Text)

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship('Like', back_populates= 'user')


    followed = db.relationship(
        'User', secondary=follow,
        primaryjoin=(follow.c.follower_id == id),
        secondaryjoin=(follow.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    # not_followed = db.relationship(
    #     'User', secondary=follow,
    #     primaryjoin=(follow.c.follower_id == id),
    #     secondaryjoin=(follow.c.followed_id == id),
    #     backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img_src': self.profile_img_src
        }

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            follow.c.followed_id == user.id).count() > 0

    def not_follower(self, user):
        return self.followed.filter(
            follow.c.follower_id != user.id
        )

    def followed_posts(self):
        followed = Post.query.join(
            follow, (follow.c.followed_id == Post.user_id)).filter(
                follow.c.follower_id == self.id)
        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.created_at.desc())
    #hi
