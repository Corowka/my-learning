#include "BaseTable.h"

BaseTable::BaseTable() 
{
	size_ = 0;
	columns_ = 3;
	valuesCounter_ = 0;
};

BaseTable::BaseTable(int const& size, int const& columns)
{
	size_ = size;
	columns_ = columns;
	valuesCounter_ = 0;
	table_ = std::vector<std::vector<std::string*>>(size);
	for (int i = 0; i < size_; i++)
	{
		table_[i] = std::vector<std::string*>(columns_, nullptr);
	}
}

BaseTable::BaseTable(const BaseTable& obj)
{
	size_ = obj.size_;
	columns_ = obj.columns_;
	valuesCounter_ = obj.valuesCounter_;
	table_ = obj.table_;
}

BaseTable::~BaseTable()
{
	for (int i = 0; i < size_; i++)
	{
		table_[i].clear();
	}
	table_.clear();
}

std::vector<std::vector<std::string>> BaseTable::loadTo(std::vector<std::vector<std::string>> values)
{
	for (int i = 0; i < size_; i++)
	{
		if (table_[i][0] != nullptr)
		{
			std::vector<std::string> val(columns_);
			for (int j = 0; j < columns_; j++)
			{
				val[j] = *table_[i][j];
			}
			values.push_back(val);
		}
	}
	return values;
}

void print_line(int const& length)
{
	std::cout << "+";
	for (int i = 0; i < length - 2; i++)
	{
		std::cout << "-";
	}
	std::cout << "+" << std::endl;
}

void BaseTable::print()
{
	int length = 5 + 17 * columns_ + columns_;
	std::cout << std::endl;
	print_line(length);
	std::cout << '|' << std::setw(5) << "ID" << " |"
		<< std::setw(15) << "NAME" << " |"
		<< std::setw(15) << "AGE" << " |"
		<< std::setw(15) << "SEX" << " |\n";
	print_line(length);
	if (valuesCounter_ != 0)
	{
		for (int id = 0; id < size_; id++)
		{
			if (table_[id][0] != nullptr)
			{
				std::cout << '|' << std::setw(5) << id << " |";
				for (int col = 0; col < columns_; col++)
				{
					std::cout << std::setw(15) << *table_[id][col] << " |";
				}
				std::cout << std::endl;
			}
		}
		print_line(length);
	}
	std::cout << std::endl;
}

std::string& BaseTable::field(const int& i, const int& j)
{
	return *table_[i][j];
}

int BaseTable::size()
{
	return size_;
}

int BaseTable::columns()
{
	return columns_;
}