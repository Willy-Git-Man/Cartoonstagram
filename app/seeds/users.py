from app.models.user import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    ashKetchum = User(
        username='Ash Ketchum',
        email='pokemon@aa.io',
        password='password',
        profile_img_src='https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0MDExNDA2Mzc3NTU5OTMx/ash-ketchum-accomplishments-pokemon.jpg'
    )

    spongeBob = User(
        username='SpongeBob',
        email='sponge@sb.io',
        password='password',
        profile_img_src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png'
    )

    samuraiJack = User(
        username='Samurai Jack',
        email='samurai@akusux.com',
        password='password',
        profile_img_src='https://hbomax-images.warnermediacdn.com/images/GXa5NxQI8g5GYoAEAAAAm/tileburnedin?size=1280x720&partner=hbomaxcom&v=6c7113e1539d520cd6917b89e8fbe4e6&language=en-us&host=art-gallery.api.hbo.com&w=Infinity'
    )

    sasuke = User(
        username='Sasuke Uchiha',
        email='sasuke@sb.io',
        password='password',
        profile_img_src='https://i1.sndcdn.com/artworks-VjGqBIzkty4peuuo-Nyc22Q-t500x500.jpg'
    )
    jigglypuff= User(
        username='JigglyPuff',
        email='jiggy@puff.com',
        password='password',
        profile_img_src='https://external-preview.redd.it/1NjDQd_mSLUIQ4gREA-zLNesTP-_gLKFX1yuMnVtdVk.jpg?auto=webp&s=e83971eb53c1a4bc0db65ff6f752986845f719d6'
    )

    scooby = User(
        username='Scooby Doo',
        email='scooby@aa.io',
        password='password',
        profile_img_src='https://resizing.flixster.com/I0HVV0XJJff02t0NGMuiry7yxzc=/300x300/v2/https://flxt.tmsimg.com/assets/p186415_i_h8_ab.jpg'
    )
    johnyBravo = User(
        username='JohhnyBravo',
        email='bravo@aa.io',
        password='password',
        profile_img_src='https://i1.sndcdn.com/artworks-000617209720-i4idf5-t500x500.jpg'
    )

    helgaPotacki = User(
        username='Helga Potacki',
        email='hpotacki@iluva.com',
        password='password',
        profile_img_src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzR0nL3-Jp--NQhGAIeL91Hng1zcVokIUdOA&usqp=CAU'
    )

    leo= User(
        username='leo_turtle',
        email='leo@turtle.com',
        password='password',
        profile_img_src='https://i.pinimg.com/originals/45/bf/0f/45bf0f54b33a97a553b7f831d65416c9.jpg'
    )

    demo = User(
        username='Howard M. Burgers',
        email='demo@aa.io',
        password='password',
        profile_img_src='https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg'
    )



    db.session.add(ashKetchum)
    db.session.add(samuraiJack)
    db.session.add(spongeBob)
    db.session.add(sasuke)
    db.session.add(jigglypuff)
    db.session.add(johnyBravo)
    db.session.add(scooby)
    db.session.add(demo)
    db.session.add(helgaPotacki)
    db.session.add(leo)
    db.session.add(demo)






    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
