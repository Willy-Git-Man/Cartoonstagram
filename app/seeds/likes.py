from app.models.likes import db, Like

def seed_likes():
    demo = Like(user_id=1, post_id=1)


    db.session.add(demo)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
