from app.models.follows import db, follow

def seed_follow():
    demo = follow(followed_id=1, follower_id=2)
    demo2 = follow(followed_id=2, follower_id=1)

    

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()

def undo_follow():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()