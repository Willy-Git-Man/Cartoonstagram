from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
# from app.models import User

class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    img_src = StringField('img_src', validators=[DataRequired()])
    caption_content = StringField('caption_content', validators=[DataRequired()])
    location = StringField('location')
    created_at = DateTimeField('created_at')
