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

'''
if __name__ == '__main__':
    app.run()
'''
