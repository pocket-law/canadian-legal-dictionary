import re

text_file = open("subjectsOutput.json", "w")

text_file.write("[\n")

terms_list = open('subjects_list.txt')
try:
    for line in terms_list:
		text_file.write("{\n\"name\": \""+line.replace("\n","")+"\"\n},\n")
finally:
	text_file.write("]")
	terms_list.close()	

text_file.close()