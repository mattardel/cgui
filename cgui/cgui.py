from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

# from flask_wtf import FlaskForm
# from wtforms import StringField
# from wtforms.validators import DataRequired


app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/')
def show_index():
    return render_template('index.html')

@app.route('/test')
def show_test():
    #use this page to test new features or design elements
    return render_template('test.html')

@app.route('/contact')
def show_about():
    #route to contact page
    return render_template('contact.html')

@app.route('/investor')
def show_investor():
    #route to investor page
    return render_template('investor.html')

@app.route('/advisor_search')
def show_advisor_search():
    #route to advisor search page
    return render_template('advisor_search.html')

@app.route('/investor_questions')
def show_investor_questions():
    #route to investor page
    return render_template('investor_questions.html')


# class InvestingForm(FlaskForm):
#     name = StringField('name', validators=[DataRequired()])

if __name__ == '__main__':
    app.run(debug=True)
