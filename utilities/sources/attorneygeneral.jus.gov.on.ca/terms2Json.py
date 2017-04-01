import re

text_file = open("AddTERMS.json", "w")


text_file.write("[\n")

DEF_FULL = ""

terms_list = open('source.txt')
try:
    for line in terms_list:
		line = line.replace("\"","\\\"")
		if ":" in line:
			text_file.write("\n	\"definition\": \"" + DEF_FULL + "\",\n")
			text_file.write("	\"source\": \n		{\n		\"url\": \"http://www.canadianlawsite.ca\",\n		\"name\": \"Canadian Law Site\"\n		}\n	},\n")
			
			DEF_FULL = "" # Reset DEF_FULL
		
			line = line.replace(":","")
			
			text_file.write("	{\n	\"term\": ")
			text_file.write("\"" + line.replace("\n","") + "\",")
		else:
			DEF_FULL = DEF_FULL + line.replace("\n","")
finally:
	text_file.write("]")
	terms_list.close()	

text_file.close()