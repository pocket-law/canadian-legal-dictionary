from HTMLParser import HTMLParser
import urllib2
import re




get_term = False
get_definition = False
get_source = False
get_data = False
get_link = False
GLOBAL_STOP_HANDLE = False
add_comma = False

text_file = open("outputFromIrwin.txt", "w")

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):

	global text_file

	def handle_starttag(self, tag, attrs):
		global get_data
		global get_term
		global get_definition
		global get_source
		global get_link
		global GLOBAL_STOP_HANDLE
			
		if tag == "h1":
			print "<term>"
			text_file.write("<term>\n")
			
			get_term = True
			get_data = True
			
		if tag == "div" and attrs == [('class', 'subjects')]:
			get_source = True
		
		if tag == "div" and attrs == [('class', 'reference')]:
			get_data = False
			get_source = False
		if tag == "span" and attrs == [('class', 'definition-label')]:
			get_source = True
		if tag == "a":
			get_data = True
			if get_link == True and not GLOBAL_STOP_HANDLE:
				for name, value in attrs:
					print "<url>"
					text_file.write("<url>\n")
					print "https://www.irwinlaw.com" + value
					text_file.write("https://www.irwinlaw.com" + value +"\n")
					print "<name>"
					text_file.write("<name>\n")
				get_link = False
			
		if tag == "div" and attrs == [('class', 'definition-text')]:
			print "<definition>"
			text_file.write("\n<definition>\n")
			get_definition = True
			
		if tag == "p":
			get_data = True
			

		
			
		if tag == "section" and attrs == [('id', 'tertiary'), ('class', 'tertiary zone')] and not GLOBAL_STOP_HANDLE:
			GLOBAL_STOP_HANDLE = True
			print "<END>"
			text_file.write("\n<END>\n")
			print "############################################"
			
		if tag == "aside" and attrs == [('id', 'main_sidebar'), ('class', 'inner_sidebar')] and not GLOBAL_STOP_HANDLE:
			GLOBAL_STOP_HANDLE = True
			print "<END>"
			text_file.write("\n<END>\n")
			print "############################################"
			


	def handle_endtag(self, tag):
		global get_data
		global get_term
		global get_definition
		global get_source
		global get_link
		
		if tag == "h1":
			get_term = False
			get_data = False
			
		if tag == "p":
			get_definition = False
			get_data = False
		
		if tag == "ul":
			get_source = False
			get_data = False
			
		if tag == "a":
			DO_TAG = False
			get_link = False


	def handle_data(self, data):
		global get_data
		global get_term
		global get_definition
		global get_source
		global get_link
		global add_comma
		
		if data == "See also:" and not GLOBAL_STOP_HANDLE:
			print "<related_terms>"
			text_file.write("\n<related_terms>\n")
			
		if data == "See:" and not GLOBAL_STOP_HANDLE:
			print "<related_terms>"
			text_file.write("\n<related_terms>\n")
			
		if data == "Title:" and not GLOBAL_STOP_HANDLE:
			print "<source>"
			text_file.write("\n<source>\n")

			get_link = True
			
		if data == "Filed in:" and not GLOBAL_STOP_HANDLE:
			print "<categories>"
			text_file.write("\n<categories>\n")
			add_comma = True
		
		if data == "By:" and not GLOBAL_STOP_HANDLE:
			print " - "
			text_file.write(" - ")
		
		if get_term and not GLOBAL_STOP_HANDLE and get_data and (not data.isspace()):
			print data
			text_file.write(data)
		
		if get_definition and not GLOBAL_STOP_HANDLE and get_data and (not data.isspace()):
			print data
			text_file.write(data)
			
		if get_source and not GLOBAL_STOP_HANDLE and get_data and (not data.isspace()) and (not data == "By:") and (not data == "Title:") and (not get_definition == True):
			if add_comma == True and (not data.endswith(' ')) and (not '&' in data):
				print data + ", "
				text_file.write(data + ", ")
			else:
				print data
				text_file.write(data)

	



# instantiate the parser and feed it html from for loop
parser = MyHTMLParser()

terms_list = open('terms_list.txt')
try:
    for line in terms_list:
		line = re.sub(r"[ ]", "_", line)
		line = re.sub(r"\(", "", line)
		line = re.sub(r"\)", "", line)
		line = re.sub(r"[^\x00-\x7F]", "", line)
		line = re.sub(r",", "", line)
		line = re.sub(r"\/", "", line)
		line = re.sub(r"'", "", line)
		line = re.sub(r";", "", line)

		GLOBAL_STOP_HANDLE = False
		add_comma = False
		response = urllib2.urlopen('https://www.irwinlaw.com/cold/' + line.lower())
		html = response.read()
		parser.feed(html)
finally:
    terms_list.close()	

text_file.close()