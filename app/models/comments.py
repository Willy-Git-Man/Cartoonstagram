from .db import db
from flask_login import current_user

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable = False)
  comment_content = db.Column(db.Text, nullable = False)

  post = db.relationship("Post", back_populates="comments")
  user = db.relationship("User", back_populates = "comments")

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'post_id': self.post_id,
      'comment_content': self.comment_content
 }