from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  img_src = db.Column(db.Text, nullable = False)
  caption_content = db.Column(db.Text)
  location = db.Column(db.String(100))
  created_at = db.Column(db.DateTime)

  user = db.relationship("User", back_populates = "posts")
  comments = db.relationship("Comment", back_populates = "post")
