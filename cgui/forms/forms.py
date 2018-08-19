from flask_wtf import Form
from wtforms import StringField, SubmitField, SelectField, IntegerField, validators

class ScreeningForm(Form):
    name = StringField('Name')
    screen = SelectField('Do you want to save for retirement, build wealth, or save for a specific goal?', choices=[('ret', 'Retirement'), ('build', 'Build Wealth'), ('goal', 'Save for a Goal')])
    ageRet = IntegerField('What age do you plan to retire?')
    currAge = IntegerField('What is your current age?')
    nestegg = IntegerField('How much do you want saved for retirement?')
    monthly = IntegerField('How much can you invest per month?')
    esp = SelectField('Does your employer offer any stock or retirement plans?', choices=[('y', 'Yes'),('n', 'No')])

    risk = SelectField('How aggressive do you want to be with your investments?', choices=[('cons', 'Conservative'), ('avg', 'Average'), ('agg', 'Aggressive')])
    intl = SelectField('Are you interested in investing internationally?', choices=[('y', 'Yes'), ('n', 'No')])
    sellSpeed = SelectField('Do you plan on selling early or minimizing taxes?', choices=[('early', 'Sell Early'), ('minTax', 'Minimize Taxes')])

    goal = StringField('What goal are you saving for?')
    eta = SelectField('When will you need the money?', [('soon', '1-2 years'), ('mid', '3-5 years'), ('far', '6-10 years'), ('long', '10+ years')])
    goalNum = IntegerField('What is you savings goal?')
    coll = SelectField('Are you saving for college?', choices=[('y', 'Yes'), ('n', 'No')])
    kids = IntegerField('How many kids are you saving for?')
    collType = SelectField('Are you planning on public or private college?', choices=[('pub', 'Public'), ('priv', 'Private')])
    loan = SelectField('Are you saving for a down payment on a loan?', choices=[('y', 'Yes'), ('n', 'No')])
    submit = SubmitField('send')