from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comment, undo_comment
from .likes import seed_likes, undo_likes
# from .follows import seed_follow, undo_follow

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_posts()
    seed_comment()
    seed_likes()
    # seed_follow()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_posts()
    undo_comment()
    undo_likes()
    # undo_follow()
