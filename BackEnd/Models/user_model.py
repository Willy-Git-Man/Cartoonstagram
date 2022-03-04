from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  hashPassword = db.Column(db.String(100))
  profile_img_src = db.Column(db.Text, nullable=False)

  posts = db.relationship("Post", back_populates="user")
  comments = db.relationship("Comment", back_populates="user")

  followers = db.relationship("Follow", secondary=follow, back_populates="followeds")
  followeds = db.relationship("Followed", secondary=follow, back_populates="followers")
