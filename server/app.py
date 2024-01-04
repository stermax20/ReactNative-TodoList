from flask import Flask, request

app = Flask(__name__)

to_do_list = []
done_list = []

@app.route('/sticky_notes/to_do_list', methods=['GET', 'POST'])
def todo():
    if request.method == 'GET':
        return to_do_list
    elif request.method == 'POST':
        data = request.get_json()
        to_do_list.append(data)
        print("to_do_list: ", to_do_list)
        return "200"

@app.route('/sticky_notes/to_do_list/<int:index>', methods=['DELETE'])
def delete_todo(index):
    if index < len(to_do_list):
        del to_do_list[index]
        return "200"
    else:
        return "Index out of range"

@app.route('/test')
def test():
    return 'Test OK'
