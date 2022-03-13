from datetime import datetime
from app.models.post import db, Post

# Adds a demo user, you can add other users here if you want
def seed_posts():
    ashkKetchun = Post(
        user_id=1,
        img_src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/04/pokemon-ash-and-pikachu.jpg",
        caption_content='Another good training session with my guy!',
        location='Pallet Town, Canto region',
        created_at=datetime.now()
    )
    spongeBob = Post(
        user_id=3,
        img_src="https://insidethemagic.net/wp-content/uploads/2021/07/SpongeBob_and_Patrick_Best_Friends.jpeg",
        caption_content='Me and my buddy!',
        location='Bikini Bottom',
        created_at=datetime.now()
    )

    samuraiJack = Post(
        user_id=2,
        img_src="https://i.stack.imgur.com/WzQ7m.jpg",
        caption_content='Aku didn\'t stand a chance!!',
        location='The Future',
        created_at=datetime.now()
    )
    sasuke = Post(
        user_id=4,
        img_src="https://www.animesoulking.com/wp-content/uploads/2021/04/naruto-vs-sasuke-740x414.jpeg",
        caption_content='We\'ve come a long way my friend...',
        location='Konoha',
        created_at=datetime.now()
    )
    helgaShrine = Post(
        user_id=9,
        img_src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/65c41143-2d90-4421-9b7d-0392e8099ec1/dcs0l79-10afbe4c-e2eb-480f-ab33-17d2011da210.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY1YzQxMTQzLTJkOTAtNDQyMS05YjdkLTAzOTJlODA5OWVjMVwvZGNzMGw3OS0xMGFmYmU0Yy1lMmViLTQ4MGYtYWIzMy0xN2QyMDExZGEyMTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eqAT1CXJRbMMZ_3A-jV2FJFfUg-XugRSYF2nkZ2pOKk",
        caption_content='Shrine time',
        location='Hillwood, Washington',
        created_at=datetime.now()
    )

    jigglypuff = Post(
        user_id=5,
        img_src="https://wallpapers.com/images/high/pokemon-cute-jigglypuff-rj46nbgsd51rejka.jpg",
        caption_content='Dance Session!',
        location='Elite 8 Gym',
        created_at=datetime.now()
    )
    scooby = Post(
        user_id=7,
        img_src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-06/210615-scooby-doo-al-1315-25fdf5.jpg",
        caption_content='The Gangs all here!',
        location='The Mystery Inc',
        created_at=datetime.now()
    )
    johnyBravo = Post(
        user_id=6,
        img_src="https://sportshub.cbsistatic.com/i/2021/03/18/60d26684-bb73-4854-8105-7ecb5afcb8ac/my-hero-academia-johnny-bravo-crossover-art-1220899.jpg",
        caption_content='Flexing on my hero!',
        location='The Mystery Inc',
        created_at=datetime.now()
    )
    leo = Post(
        user_id=10,
        img_src="https://chud.com/nextraimages/TMNT2.jpg",
        caption_content='Humble Beginnings!',
        location='The Sewer',
        created_at=datetime.now()
    )
    demo = Post(
        user_id=8,
        img_src="https://2.bp.blogspot.com/-QRxNQ0OFnCU/UdgWpeJegmI/AAAAAAAAHJ0/GR1jP3ZeYOA/s1600/Cartoon_Badger.jpg",
        caption_content='I am the Demo Badger!!',
        location='BadgerVille USA',
        created_at=datetime.now()
    )

    db.session.add(ashkKetchun)
    db.session.add(spongeBob)
    db.session.add(samuraiJack)
    db.session.add(sasuke)
    db.session.add(helgaShrine)
    db.session.add(jigglypuff)
    db.session.add(scooby)
    db.session.add(johnyBravo)
    db.session.add(leo)
    db.session.add(demo)


    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
