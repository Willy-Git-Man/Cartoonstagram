from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  username = db.Column(db.String(50), unique=True, nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  hashPassword = db.Column(db.String(100))
  profile_img_src = db.Column(db.Text, nullable=False)

  posts = db.relationship("Post", back_populates="user")
  comments = db.relationship("Comment", back_populates="user")
