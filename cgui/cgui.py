from flask import Flask, render_template
from funds.funds import Funds
from cgui.funds.funds import Funds


app = Flask(__name__)
app.config.from_object(__name__)
funds = Funds()

@app.route('/')
def show_index():
    return render_template('index.html', funds_dict=funds.funds_dict, funds_closings=funds.closings_dict)

if __name__ == '__main__':
    app.run(debug=True)