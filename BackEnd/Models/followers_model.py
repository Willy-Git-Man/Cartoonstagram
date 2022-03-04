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


