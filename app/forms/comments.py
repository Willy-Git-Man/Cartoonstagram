from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField,TextAreaField
from wtforms.validators import DataRequired, ValidationError
# from app.models import User

class CommentsPostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    # comment_content = StringField('comment_content', validators=[DataRequired()])
    comment_content = TextAreaField('comment_content', validators=[DataRequired()])
