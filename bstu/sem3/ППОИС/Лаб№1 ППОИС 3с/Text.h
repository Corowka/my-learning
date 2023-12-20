#pragma once
#include <iostream>
#include <ctime>
using std::cout;
using std::endl;
using std::string;
using std::ostream;

class Text
{
private: 
	string title;
	string text;
	string ps;
protected:
	int line = 100;
public: 
	Text();
	Text(string title, string text, string ps);
	Text(const Text& txt);
	void TO_SET_TITLE(string title);
	void TO_SET_TEXT(string text);
	void TO_SET_PS(string ps);
	void TO_SHOW_TEXT();
	int COUNT();
	int COUNT(char chr);
	int COUNT(char chr, int ln);
};

