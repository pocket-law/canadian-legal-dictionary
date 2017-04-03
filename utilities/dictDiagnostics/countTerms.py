import json

with open('dict.json') as json_data:
    data = json.load(json_data)
    
    count = 0
	
    for term in data['terms']:
	    count = count + 1
	    print(count)
