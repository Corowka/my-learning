#pragma once
#include<vector>
#include<iostream>
#include<iomanip>
#include<string>
#include<algorithm>

class BaseTable
{

protected:

	std::vector<std::vector<std::string*>> table_;
	int size_;
	unsigned valuesCounter_;
	unsigned columns_;

public:

	BaseTable();

	BaseTable(int const& size, int const& columns);
	
	BaseTable(const BaseTable& obj);

	~BaseTable();

	std::vector<std::vector<std::string>> loadTo(std::vector<std::vector<std::string>> values);

	virtual bool insert(const std::vector<std::string>& value) = 0;

	virtual bool remove(const std::string& value) = 0;

	virtual int search(const std::string& value) = 0;

	virtual bool replace(const std::vector<std::string>& old_value,
		const std::vector<std::string>& new_value) = 0;

	void print();

	std::string& field(const int& i, const int& j);

	int size();

	int columns();

};