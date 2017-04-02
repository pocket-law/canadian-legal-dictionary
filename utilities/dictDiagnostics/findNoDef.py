import json

with open('dict.json') as json_data:
    data = json.load(json_data)
	
    termsList = []
	
    print('No Definition:')
    	
    for term in data['terms']:
        try:
            temp = term['definition']
        except KeyError:
            print(term['term'])
