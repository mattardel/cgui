from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

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

@app.route('/scale')
def show_scale():
    #route toscale page
    return render_template('scale.html')

@app.route('/portfolio')
def show_portfolio():
    funds_dict = {
            'AMCPX':'AMCAP Fund',
            'AMRMX':'American Mutual Fund Class A',
            'INPAX':'Conservative Growth and Income Portfolio',
            'BFCAX':'Corporate Bond Fund',
            'DWGAX':'Developing World Growth and Income Fund',
            'EBNAX':'Emerging Markets Bond Fund ',
            'GBLAX':'Global Balanced Fund Class A',
            'PGGAX':'Global Growth Portfolio',
            'GWPAX':'Growth Portfolio',
            'GAIOX':'Growth and Income Portfolio',
            'BLPAX':'Moderate Growth and Income Portfolio',
            'MFAAX':'Mortgage Fund',
            'ANBAX':'Strategic Bond Fund',
            'AFAXX':'U.S. Government Money Market Fund',
            'AANTX':'2060 Target Date Retirement Fund',
            'AEPGX':'EuroPacific Growth Fund',
            'ANEFX':'The New Economy Fund',
            'ANWPX':'New Perspective Fund',
            'AGTHX':'The Growth Fund of America',
            'SMCWX':'SMALLCAP World Fund',
            'NEWFX':'New World Fund',
            'CWGIX':'Capital World Growth and Income Fund',
            'ANCFX':'Fundamental Investors',
            'AIVSX':'The Investment Company of America',
            'AWSHX':'Washington Mutual Investors Fund',
            'CAIBX':'Capital Income Builder',
            'AMECX':'The Income Fund of America',
            'ABALX':'American Balanced Fund',
            'AHITX':'American High Income Trust',
            'BFIAX':'American Funds Inflation Linked Bond Fund',
            'ASBAX':'Short-Term Bond Fund of America',
            'AIBAX':'Intermediate Bond Fund of America',
            'AMUSX':'U.S. Government Securities Fund',
            'ABNDX':'The Bond Fund of America',
            'CWBFX':'Capital World Bond Fund',
            'AMHIX':'American High-Income Municipal Bond Fund',
            'ASTEX':'American Funds Short-Term Tax-Exempt Bond Fund',
            'AFTEX':'American Funds Tax-Exempt Fund of America',
            'LTEBX':'Limited Term Tax-Exempt Bond Fund of America',
            'TAFTX':'The Tax-Exempt Fund of California',
            'TRBCX':'T. Rowe Price Blue Chip Growth Fund',
            'VPMCX':'Vanguard PrimeCap Fund',
            'FBGRX':'Fidelity Blue Chip Growth Fund',
            'TLIIX':'TIAA-CREF Enhanced Lg Cp Gr Idx',
            'POGRX':'PrimeCap Odyssey Growth Fund',
            'VPCCX':'Vanguard PrimeCap Core Fund',
            'FKDNX':'Franklin DynaTech Fund',
            'GLCGX':'Goldman Sachs Large Cap Gr Insghts Fd',
            'BIAFX':'Brown Advisory Flexible Equity Fund',
            'HACAX':'Harbor Capital Appreciation Fund'
    }
    # route to investor page
    return render_template('portfolio.html', mutual_funds=funds_dict)

if __name__ == '__main__':
    app.run(debug=True)
