#include "Menu.h"

Menu::Menu()
{
	state_menu_ = 0;
	start_menu();
	m_table_ = Table(0, 3);
	m_hashtable_ = HashTable(45, 3);
}

Menu::~Menu() {}

void print(const char& corner, const char& line, int const& length)
{
	std::cout << corner;
	for (int i = 0; i < length - 2; i++)
	{
		std::cout << line;
	}
	std::cout << corner << std::endl;
}

void Menu::start_menu()
{
	system("cls");
	int length = 29;
	print('+', '-', length);
	std::cout << "| MAIN MENU                 |" << std::endl; print('+', '-', length);
	std::cout << "| TABLE                     |" << std::endl; print('+', '-', length);
	std::cout << "| 1.  PRINT                 |" << std::endl;
	std::cout << "| 2.  INSERT                |" << std::endl;
	std::cout << "| 3.  REMOVE                |" << std::endl;
	std::cout << "| 4.  REPLACE               |" << std::endl;
	std::cout << "| 5.  SEARCH                |" << std::endl; print('+', '-', length);
	std::cout << "| HASHTABLE                 |" << std::endl; print('+', '-', length);
	std::cout << "| 6.  PRINT                 |" << std::endl;
	std::cout << "| 7.  INSERT                |" << std::endl;
	std::cout << "| 8.  REMOVE                |" << std::endl;
	std::cout << "| 9.  REPLACE               |" << std::endl;
	std::cout << "| 10. SEARCH                |" << std::endl; print('+', '-', length);
	std::cout << "| 11. TEST                  |" << std::endl; print('+', '-', length);
	std::cout << "| 12. QUIT                  |" << std::endl; print('+', '-', length);

	std::cout << std::endl << "Choose function: ";
	std::cin >> state_menu_;
	system("cls");

	switch (state_menu_)
	{
	case  1: print_table();       break;
	case  2: insert_table();      break;
	case  3: remove_table();      break;
	case  4: replace_table();     break;
	case  5: search_table();      break;
	case  6: print_hashtable();   break;
	case  7: insert_hashtable();  break;
	case  8: remove_hashtable();  break;
	case  9: replace_hashtable(); break;
	case 10: search_hashtable();  break;
	case 11: test();              break;
	case 12: quit();              break;
	default: start_menu();        break;
	}
}

void Menu::quit() { system("cls"); }

void Menu::test()
{
	const int size = 35;
	std::vector<std::vector<std::string>> values(size);
	std::vector<std::string> item = { "Harry", "82", "M" };
	values.push_back(item);
	item = { "Oliver", "82", "M" };
	values.push_back(item);
	item = { "Jack", "19", "M" };
	values.push_back(item);
	item = { "Charlie", "13", "F" };
	values.push_back(item);
	item = { "Thomas", "22", "M" };
	values.push_back(item);
	item = { "Jacob", "30", "M" };
	values.push_back(item);
	item = { "Alfie", "25", "F" };
	values.push_back(item);
	item = { "Riley", "15", "M" };
	values.push_back(item);
	item = { "William", "40", "M" };
	values.push_back(item);
	item = { "James", "45", "F" };
	values.push_back(item);
	item = { "Amelia", "20", "F" };
	values.push_back(item);
	item = { "Olivia", "23", "F" };
	values.push_back(item);
	item = { "Jessica", "17", "F" };
	values.push_back(item);
	item = { "Emily", "13", "F" };
	values.push_back(item);
	item = { "Lily", "16", "F" };
	values.push_back(item);
	item = { "Ava", "32", "F" };
	values.push_back(item);
	item = { "Heather", "69", "M" };
	values.push_back(item);
	item = { "Sophie", "70", "F" };
	values.push_back(item);
	item = { "Mia", "128", "F" };
	values.push_back(item);
	item = { "Isabella", "34", "F" };
	values.push_back(item);
	item = { "Alyssa", "82", "M" };
	values.push_back(item);
	item = { "Amanda", "12", "F" };
	values.push_back(item);
	item = { "Amber", "46", "F" };
	values.push_back(item);
	item = { "Jose", "29", "M" };
	values.push_back(item);
	item = { "Joseph", "90", "M" };
	values.push_back(item);
	item = { "Laura", "57", "F" };
	values.push_back(item);
	item = { "Leah", "8", "M" };
	values.push_back(item);
	item = { "Leonora", "2", "F" };
	values.push_back(item);
	item = { "Leslie", "1", "F" };
	values.push_back(item);
	item = { "Lillian", "6", "M" };
	values.push_back(item);
	item = { "Makayla", "24", "F" };
	values.push_back(item);
	item = { "Linda", "82", "M" };
	values.push_back(item);
	item = { "Lorna", "10", "F" };
	values.push_back(item);
	item = { "Luccile", "23", "F" };
	values.push_back(item);
	item = { "Mike", "57", "M" };
	values.push_back(item);
	item = { "Gaben", "100", "M" };
	values.push_back(item);

	std::vector<std::string> test = { "test", "999", "M" };
	std::vector<std::string> test1 = { "test1", "000", "F" };

	Table table(0, 3);
	std::cout << "Table was created.\n";
	table.print();

	table.insert(test);
	std::cout << "InsertTest: Insert srt=[test].\n";
	table.print();

	std::cout << "SearchTest: Position of [test] is [" << table.search("test") << "].\n\n";

	std::cout << "ReplaceTest: Replace [test] with [test1].\n";
	table.replace(test, test1);
	table.print();

	std::cout << "RemoveTest: Remove [test1].\n";
	table.remove("test1");
	table.print();

	HashTable hashtable;
	std::cout << "HashTable was created.\n";
	hashtable.print();

	hashtable.insert(test);
	std::cout << "InsertTest: Insert srt=[test].\n";
	hashtable.print();

	std::cout << "SearchTest: Position of [test] is [" << hashtable.search("test") << "].\n\n";

	std::cout << "ReplaceTest: Replace [test] from pos [" << hashtable.search("test") << "].\n";
	hashtable.replace(test, test1);
	hashtable.print();

	std::cout << "RemoveTest: Remove [test].\n";
	hashtable.remove("test");
	hashtable.print();

	std::cout << "Move data from table to hashtable:\n";

	table = Table(values);
	table.print();

	std::vector<std::vector<std::string>> valuesFromTable = table.loadTo(valuesFromTable);

	hashtable = HashTable(valuesFromTable);
	hashtable.print();

	hashtable.draw_collision();
	
	system("pause");
	start_menu();
}

void Menu::print_table()
{
	system("cls");
	m_table_.print();
	system("pause");
	start_menu();
}

void Menu::insert_table()
{
	std::cout << " << INSERT ITEM IN TABLE >>" << std::endl;
	std::vector<std::string> input(3, "");
	std::cout << " Enter name (str): ";
	std::cin >> input[0];
	std::cout << " Enter age (int): ";
	std::cin >> input[1];
	std::cout << " Enter sex[M/F] (char): ";
	std::cin >> input[2];
	m_table_.insert(input);
	if (m_table_.search(input[0]) != -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	} else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_table();
}

void Menu::remove_table()
{
	std::cout << " << REMOVE ITEM FROM TABLE WITH NAME >>" << std::endl;
	std::string name;
	std::cout << " Enter name (str): ";
	std::cin >> name;
	m_table_.remove(name);
	if (m_table_.search(name) == -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	}
	else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_table();
}

void Menu::search_table()
{
	std::cout << " << SEARCH ITEM FROM TABLE WITH NAME >>" << std::endl;
	std::string name;
	std::cout << " Enter name (str): ";
	std::cin >> name;
	std::cout << " The id of field with name [" << name << "] is [" << m_table_.search(name) << "]\n";
	system("pause");
	start_menu();
}

void Menu::replace_table()
{
	std::cout << " << REPLACE ITEM IN TABLE >>" << std::endl;
	std::vector<std::string> old_item(3, "");
	std::cout << " Enter name to replace (str): ";
	std::cin >> old_item[0];
	std::cout << " Enter age to replace (int): ";
	std::cin >> old_item[1];
	std::cout << " Enter sex[M/F] to replace (char): ";
	std::cin >> old_item[2];
	std::vector<std::string> new_item(3, "");
	std::cout << " Enter name to replace (str): ";
	std::cin >> new_item[0];
	std::cout << " Enter age to replace (int): ";
	std::cin >> new_item[1];
	std::cout << " Enter sex[M/F] to replace (char): ";
	std::cin >> new_item[2];
	m_table_.replace(old_item, new_item);
	if (m_table_.search(old_item[0]) == -1 && m_table_.search(new_item[0]) != -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	}
	else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_table();
}

void Menu::print_hashtable()
{
	system("cls");
	m_hashtable_.print();
	system("pause");
	start_menu();
}

void Menu::insert_hashtable()
{
	std::cout << " << INSERT ITEM IN TABLE >>" << std::endl;
	std::vector<std::string> input(3, "");
	std::cout << " Enter name (str): ";
	std::cin >> input[0];
	std::cout << " Enter age (int): ";
	std::cin >> input[1];
	std::cout << " Enter sex[M/F] (char): ";
	std::cin >> input[2];
	m_hashtable_.insert(input);
	if (m_hashtable_.search(input[0]) != -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	}
	else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_hashtable();
}

void Menu::remove_hashtable()
{
	std::cout << " << REMOVE ITEM FROM TABLE WITH NAME >>" << std::endl;
	std::string name;
	std::cout << " Enter name (str): ";
	std::cin >> name;
	m_table_.remove(name);
	if (m_hashtable_.search(name) == -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	}
	else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_hashtable();
}

void Menu::search_hashtable()
{
	std::cout << " << SEARCH ITEM FROM TABLE WITH NAME >>" << std::endl;
	std::string name;
	std::cout << " Enter name (str): ";
	std::cin >> name;
	std::cout << " The id of field with name [" << name << "] is [" << m_hashtable_.search(name) << "]\n";
	system("pause");
	start_menu();
}

void Menu::replace_hashtable()
{
	std::cout << " << REPLACE ITEM IN TABLE >>" << std::endl;
	std::vector<std::string> old_item(3, "");
	std::cout << " Enter name to replace (str): ";
	std::cin >> old_item[0];
	std::cout << " Enter age to replace (int): ";
	std::cin >> old_item[1];
	std::cout << " Enter sex[M/F] to replace (char): ";
	std::cin >> old_item[2];
	std::vector<std::string> new_item(3, "");
	std::cout << " Enter name to replace (str): ";
	std::cin >> new_item[0];
	std::cout << " Enter age to replace (int): ";
	std::cin >> new_item[1];
	std::cout << " Enter sex[M/F] to replace (char): ";
	std::cin >> new_item[2];
	m_hashtable_.replace(old_item, new_item);
	if (m_hashtable_.search(old_item[0]) == -1 && m_hashtable_.search(new_item[0]) != -1)
	{
		std::cout << " The operation done successfully! " << std::endl;
	}
	else {
		std::cout << " The operation done abortive! " << std::endl;
	}
	system("pause");
	print_hashtable();
}
