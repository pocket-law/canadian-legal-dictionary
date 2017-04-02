import json

with open('dict.json') as json_data:
    data = json.load(json_data)
    
    mDate = '040117' #set this manually for now
    i = 0
    	
    for term in data['terms']:
	    i += 1
	    term['uniqueID'] = mDate + 'n' + str(i)
	    print(term)

    with open('outputFile.json', 'w') as outfile:
	    json.dump(data, outfile)