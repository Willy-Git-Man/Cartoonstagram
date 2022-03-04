from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable = False)
  comment_content = db.Column(db.Text, nullable = False)

  post = db.relationship("Post", back_populates="comments")
  user = db.relationship("User", back_populates = "comments")