import re

text_file = open("AddTERMS.json", "w")


text_file.write("[\n")

DEF_FULL = ""

terms_list = open('source.txt')
try:
    for line in terms_list:
		line = line.replace("\"","\\\"")
		if line.isupper and DEF_FULL != "":
				
			text_file.write("	{\n	\"definition\": ")
			text_file.write("\"" + line.replace("\n","") + "\",")
			
			text_file.write("\n	\"term\": \"" + DEF_FULL.title() + "\",\n")
			text_file.write("	\"source\": \n		{\n		\"url\": \"https://www.attorneygeneral.jus.gov.on.ca/english/glossary\",\n		\"name\": \"Ministry of the Attorney General (Ont)\"\n		},\n	\"tags\":[\"\"]\n	},\n")
			
			DEF_FULL = "" # Reset DEF_FULL

		else:
			DEF_FULL = DEF_FULL + line.replace("\n","")
finally:
	text_file.write("]")
	terms_list.close()	

text_file.close()