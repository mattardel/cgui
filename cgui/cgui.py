from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, json, jsonify
from forms.forms import ScreeningForm
import random

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

    # open json files
    fund_data_json_url = 'fund_data.json'
    form_data_json_url = 'form_data.json'
    fund_data = json.load(open(fund_data_json_url))
    form_data = json.load(open(form_data_json_url))

    # store american funds data into arrays by fund type
    growth = []
    bond = []
    ps = []
    rips = []
    tdf = []

    for obj in fund_data['americanFunds']:
        if obj['type'] == 'Growth':
            growth.append(obj)
        elif obj['type'] == 'Bond':
            bond.append(obj)
        elif obj['type'] == 'PS':
            ps.append(obj)
        elif obj['type'] == 'RIPS':
            rips.append(obj)
        elif obj['type'] == 'TDF':
            tdf.append(obj)

    american_funds = [growth, bond, ps, rips, tdf]
    type = { 'growth': 0, 'bond': 1, 'ps': 2, 'rips': 3, 'tdf': 4 }
    # END store american funds data into arrays by fund type

    # list to store fund screener recommendations
    recs = []
    recs.append(' ')
    recs.append(' ')

    if request.method=='POST':
        # clear recs list
        recs = []

        # update form data json
        with open(form_data_json_url, 'w') as f:
            json.dump(request.form, f)
        form_data = json.load(open(form_data_json_url))

        # using random number for fund selection
        # future iterations should use actual calculation and logic for fund selection

        # IF retirement
        if form_data['screen'] == 'retirement':
            # pick from RIPS
            randInt = random.randint(0, len(rips) - 1)
            recs.append(rips[randInt])
            print(recs[0])

            # pick from TDF
            randInt = random.randint(0, len(tdf) - 1)
            recs.append(tdf[randInt])
            print(recs[1])

            print('retirement')

        # IF wealth
        elif form_data['screen'] == 'wealth':
            # pick from growth
            randInt = random.randint(0, len(growth) - 1)
            recs.append(growth[randInt])
            print(recs[0])

            # pick from PS
            randInt = random.randint(0, len(ps) - 1)
            recs.append(ps[randInt])
            print(recs[1])

            print('wealth')

        # IF goal
        elif form_data['screen'] == 'goal':
            # pick from bond
            randInt = random.randint(0, len(bond) - 1)
            recs.append(bond[randInt])
            print(recs[0])

            # pick from growth
            randInt = random.randint(0, len(growth) - 1)
            recs.append(growth[randInt])
            print(recs[1])

            print('goal')

        return render_template('investor_questions.html', form=form, form_data=form_data, af=american_funds, type=type, recs=recs, submit=True)
    elif request.method=='GET':
        return render_template('investor_questions.html', form=form, form_data=form_data, af=american_funds, type=type, recs=recs)

if __name__ == '__main__':
    app.run(debug=True)
