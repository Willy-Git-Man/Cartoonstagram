from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
# from app.models import User

class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    profile_img_src = StringField('profile_img_src', validators=[DataRequired()])
    caption_content = StringField('caption_content', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    created_at = DateTimeField('created_at')