from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follow = db.Table("follow",

  db.Column("followed_id",
    db.Integer,
    db.ForeignKey("users.id"),
    primary_key=True
    ),

  db.Column("follower_id",
    db.Integer,
    db.ForeignKey("users.id"),
    primary_key=True
  )
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img_src = db.Column(db.Text, nullable=False)

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    followers = db.relationship("Follow", secondary=follow, back_populates="followeds")
    followeds = db.relationship("Followed", secondary=follow, back_populates="followers")
    likes = db.relationship('Like', back_populates= 'post')


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
            'email': self.email
        }
