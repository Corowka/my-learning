#pragma once
#include "Table.h"
#include "HashTable.h"
#include "Windows.h"

class Menu
{
private:
	int state_menu_;
	Table m_table_;
	HashTable m_hashtable_;
public:
	Menu();
	~Menu();
	void start_menu();
	void quit();
	void test();
	void print_table();
	void insert_table();
	void remove_table();
	void search_table();
	void replace_table();
	void print_hashtable();
	void insert_hashtable();
	void remove_hashtable();
	void search_hashtable();
	void replace_hashtable();
};

