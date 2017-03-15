from HTMLParser import HTMLParser
import urllib2
import re

response = urllib2.urlopen('http://www.irwinlaw.com/cold/abandonment')
html = response.read()

get_term = False
get_definition = False
get_source = False
get_data = False

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
	

	def handle_starttag(self, tag, attrs):
		global get_data
		global get_term
		global get_definition
		global get_source
			
		if tag == "h1":
			get_term = True
			get_data = True
			
		if tag == "a":
			get_source = True
			get_data = True


			
		if tag == "div" and attrs == [('class', 'definition-text')]:
			get_definition = True
		if tag == "div" and attrs == [('class', 'source-info')]:
			get_definition = True
		if tag == "p":
			get_data = True


	def handle_endtag(self, tag):
		global get_data
		global get_term
		global get_definition
		global get_source
		
		if tag == "h1":
			get_term = False
			get_data = False
			
		if tag == "p":
			get_definition = False
			get_data = False
		
		if tag == "a":
			get_source = False
			get_data = False


	def handle_data(self, data):
		global get_data
		global get_term
		global get_definition
		global get_source
		
		if get_term and get_data and (not data.isspace()):
			print "Encountered some TERM data  :", data
		
		if get_definition and get_data and (not data.isspace()):
			print "Encountered some DEFINITION data  :", data
			
		#if get_source and get_data and (not data.isspace()):
		#	print "Encountered some SOURCE data  :", data
	


# instantiate the parser and fed it some HTML
parser = MyHTMLParser()
parser.feed(html)
