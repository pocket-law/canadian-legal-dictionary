import json

with open('dict.json') as json_data:
    data = json.load(json_data)
	
    termsList = []
	
    print('Redundants:')
    	
    for term in data['terms']:
		mutate = term['term']
		mutate = mutate.replace(" ", "")
		mutate = mutate.upper()
		if mutate not in termsList:
		    termsList.append(mutate)
		else:
		    print(term['term'])
