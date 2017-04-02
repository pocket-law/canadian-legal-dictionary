import json

with open('dict.json') as json_data:
    data = json.load(json_data)
	
    termsList = []
	
    print('Redundants:')
    	
    for term in data['terms']:
		if term['term'] not in termsList:
		    termsList.append(term['term'])
		else:
		    print(term['term'])
