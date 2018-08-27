from flask import Flask, render_template
from funds.funds import Funds

app = Flask(__name__)
app.config.from_object(__name__)
funds = Funds()

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

@app.route('/scale')
def show_scale():
    #route toscale page
    return render_template('scale.html')

@app.route('/portfolio')
def show_portfolio():
    # route to investor page
    return render_template('portfolio.html', funds_dict=funds.funds_dict, funds_closings=funds.closings_dict)

if __name__ == '__main__':
    app.run(debug=True)
