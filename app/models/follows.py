from .db import db


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

