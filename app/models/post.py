from .db import db
from app.models.follows import follow

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
  likes = db.relationship('Like', back_populates= 'post')

  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'img_src': self.img_src,
        'caption_content': self.caption_content,
        'location': self.location,
        'created_at': self.created_at
    }

