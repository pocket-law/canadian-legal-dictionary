import re

text_file = open("AddTERMS.json", "w")



KILL_COMMA = False

SKIP_TO_TAGS = False # Taking only first definition for now for simplicity sake

FIRST_DEFINITION = False

TAGGING = False
TAG_ONE = False
WERE_TAGS = False

text_file.write("[\n")

terms_list = open('outputFromIrwin.txt')
try:
    for line in terms_list:
		if line.replace("\n","") == "<term>" and SKIP_TO_TAGS == False:
			text_file.write("\n{\n	\"term\": \"")
		elif line.replace("\n","") == "<definition>":
			TAGGING = False
			TAG_ONE = False
			if FIRST_DEFINITION == False and SKIP_TO_TAGS == False:
				text_file.write("	\"definition\": \"")
				FIRST_DEFINITION = True
			else:
				SKIP_TO_TAGS = True
		elif line.replace("\n","") == "<related_terms>":
			if SKIP_TO_TAGS == False:
				TAGGING = True
				text_file.write("	\"related_terms\": [")
		elif line.replace("\n","") == "<source>":
			if SKIP_TO_TAGS == False:
				text_file.write("	\"source\":\n		{")
		elif line.replace("\n","") == "<url>":
			if SKIP_TO_TAGS == False:
				text_file.write("\n		\"url\": \"")
		elif line.replace("\n","") == "<name>":
			if SKIP_TO_TAGS == False:
				text_file.write("		\"name\": \"")
				KILL_COMMA = True
		elif line.replace("\n","") == "<categories>":
			SKIP_TO_TAGS = False
			KILL_COMMA = False
			TAGGING = True
			WERE_TAGS = True
			text_file.write("		},\n")
			text_file.write("	\"tags\": [")
		elif line.replace("\n","") == "<END>":
			if WERE_TAGS == False:
				text_file.write("\n")
			text_file.write("	\"END\": \"end\"\n")
			text_file.write("},")
			FIRST_DEFINITION = False
			WERE_TAGS = False
			TAG_ONE = False
			TAGGING = False
		else:
			if SKIP_TO_TAGS == False:
				if KILL_COMMA:
					text_file.write(line.replace("\n","") + "\"\n")
				else:
					if TAGGING:
						varSplit = line.replace("\n","").split(",")
						splitNum = len(varSplit)
						counter = 0
						for spl in varSplit:
							counter += 1
							if counter == 1:
								if counter == splitNum:
									text_file.write("\"" + spl + "\"],\n")
									TAG_ONE = True
								else:
									text_file.write("\"" + spl + "\"")
									TAG_ONE = True
									
							elif counter == splitNum:
								if spl == "" or spl == " " or spl == "\n":
									text_file.write("],\n")
								else:
									text_file.write(", \"" + spl + "\"],\n")
							else:
								if spl != "":
									text_file.write(", \"" + spl + "\"")
							
						
					else:
						text_file.write(line.replace("\n","") + "\",\n")
	
	
finally:
	text_file.write("]")
	terms_list.close()	

text_file.close()