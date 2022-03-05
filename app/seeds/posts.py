from app.models.post import db, Post

# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo = Post(
        id=1, 
        user_id=1, 
        img_src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6hG9apgw_VGzfBWwC7cmm2ALp60d0e-G_sA&usqp=CAU", 
        caption_content='1 2 3 4',
        location='Aron City'
    )
    
    db.session.add(demo)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
