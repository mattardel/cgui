from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from cgui.forms import ScreeningForm

app = Flask(__name__)
app.config.from_object(__name__)

app.secret_key="capgroupunpaid"

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

@app.route('/investor_questions', methods=['GET', 'POST'])
def screener():
    form = ScreeningForm()
    if request.method=='POST':
        return render_template('investor_questions.html', form=form)
    elif request.method=='GET':
        return render_template('investor_questions.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
