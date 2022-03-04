from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

  post = db.relationship("Post", back_populates="comments")
  user = db.relationship("User", back_populates = "comments")
