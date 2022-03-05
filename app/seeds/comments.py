from app.models.comments import db, Comment

def seed_comment():
    demo = Comment(
        id=1, 
        user_id=1,
        post_id=1,
        comment_content='JBravo plays the tuba',
    )
    
    db.session.add(demo)

    db.session.commit()

def undo_comment():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()