from flask import Flask, jsonify, send_file, send_from_directory, make_response
app = Flask(__name__)

visitCount = 0

@app.route('/')
def hello_world():
    return send_file('static/index.html')

@app.route('/todolist')
def showToDo():
    global visitCount
    visitCount += 1
    return 'it will be a list, and you visited {0} times'.format(visitCount) 

visitorList = []
"""
/todo/all
/todo/add/<string:todo>
/todo/remove/<int:index>
"""
todoList = []

@app.route('/todo/all')
def showAll():
    return jsonify(todoList)
    # return ', \n'.join(todoList)

@app.route('/todo/add/<string:todo>')
def addTodo(todo):
    todoList.append(todo)
    return ''

@app.route('/todo/remove/<int:index>')
def removeTodo(index):
    try:
        del todoList[index]
    except IndexError:
        return make_response('404 not found', 404)
    return ''


@app.route('/user/<username>')
def show_user_profile(username):
    visitorList.append(username)
    return 'hello, User {0}. others visited: {1}'.format(username, ', '.join(visitorList))

@app.route('/<path:subpath>')
def returnJS(subpath):
    return send_file('static/{0}'.format(subpath))