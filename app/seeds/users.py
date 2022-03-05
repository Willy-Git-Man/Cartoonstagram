from app.models.user import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='JohhnyBravo', 
        email='demo@aa.io', 
        password='password', 
        profile_img_src='https://static.wikia.nocookie.net/johnnybravo/images/b/bb/Johnnyb001.gif/revision/latest/top-crop/width/360/height/450?cb=20190421193227'
    )

    demo2 = User(
        username='SpongeBob',
        email='sponge@sb.io',
        password='password',
        profile_img_src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png'
    )
  

    db.session.add(demo)
    db.session.add(demo2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
