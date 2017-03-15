from HTMLParser import HTMLParser
import urllib2
import re

response = urllib2.urlopen('http://www.irwinlaw.com/cold/abandonment')
html = response.read()

get_data = False

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
	

	def handle_starttag(self, tag, attrs):
		global get_data
		if tag == "h1" or tag == "p":
			get_data = True


	def handle_endtag(self, tag):
		global get_data
		if tag == "h1" or tag == "p":
			get_data = False


	def handle_data(self, data):
		global get_data
		if get_data:
			print "Encountered some data  :", data


# instantiate the parser and fed it some HTML
parser = MyHTMLParser()
parser.feed(html)
