from flask_wtf import Form
from wtforms import StringField, SubmitField, TextAreaField, validators

class ScreeningForm(Form):
    name = StringField('name')
    submit = SubmitField('send')